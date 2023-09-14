package com.chatgpt.services;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.entity.GenerateImageRequest;
import com.chatgpt.entity.Image;
import com.chatgpt.entity.requests.NudeDetectRequest;
import com.chatgpt.repositories.ImageRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Objects;
import java.util.UUID;

@Service
public class ImagesService {
    @Autowired
    BadListService badListService;

    @Autowired
    TranslateService translateService;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    UserService userService;

    @Autowired
    S3Service s3Service;

    public Image generateImage(String vkUserId, GenerateImageRequest generateImageRequest) {
        File tempFile = null;

        try {

            if (badListService.checkText(generateImageRequest.getPrompt())) {
                throw new BadRequestException("Запрос содержит неприемлемое содержимое");
            }

            var prompt = translateService.translate(generateImageRequest.getPrompt(), 0);
            generateImageRequest.setPrompt(prompt);

            RestTemplate restTemplate = new RestTemplate();
            String urlGenerate = "http://models:1337/image";
            HttpEntity<GenerateImageRequest> requestImage = new HttpEntity<>(generateImageRequest);
            var responseImage = restTemplate.postForEntity(urlGenerate, requestImage, String.class);

            ObjectMapper objectMapper = new ObjectMapper();
            System.out.println(responseImage.getBody());

            String imageUrl = objectMapper.readTree(responseImage.getBody()).get("url").asText();

            String urlNudeDetect = "http://models:1337/nude-detect";
            HttpEntity<NudeDetectRequest> request = new HttpEntity<>(new NudeDetectRequest(imageUrl));

            var responseNude = restTemplate.postForEntity(urlNudeDetect, request, String.class);

            // если nudenet не содержит ни один из запрещенных значений или пустой
            if (responseNude.getStatusCode().is2xxSuccessful()) {
                JsonNode resultArray = new ObjectMapper().readTree(responseNude.getBody()).get("nudenet");
                String nsfw = new ObjectMapper().readTree(responseNude.getBody()).get("nsfw").asText();

                var disabledClasses = new String[]{"BUTTOCKS_EXPOSED", "FEMALE_BREAST_EXPOSED", "FEMALE_GENITALIA_EXPOSED", "ANUS_EXPOSED", "MALE_GENITALIA_EXPOSED"};
                boolean isNudes = Objects.equals(nsfw, "nude");

                for (JsonNode object : resultArray) {

                    for (var value : disabledClasses) {
                        if (object.has("class") && object.get("class").asText().equals(value)) {
                            isNudes = true;
                            break;
                        }
                    }

                }

                if (isNudes) {
                    throw new BadRequestException("Изображение содержит непримелимое содержание, попробуйте еще");
                }
            }

            try {
                // Отправляем GET-запрос и получаем ответ в виде массива байтов
                ResponseEntity<byte[]> response = restTemplate.getForEntity(imageUrl, byte[].class);
                if (response.getStatusCode() == HttpStatus.OK) {
                    byte[] imageBytes = response.getBody();
                    if (imageBytes != null) {
                        tempFile = File.createTempFile("image-", ".png");
                        Files.write(tempFile.toPath(), imageBytes);
                        System.out.println("Картинка успешно сохранена во временный файл: " + tempFile.getAbsolutePath());
                    } else {
                        System.out.println("Ошибка: пустое содержимое картинки");
                    }
                } else {
                    System.out.println("Не удалось загрузить картинку: " + response.getStatusCode());
                }
            } catch (IOException e) {
                System.out.println("Ошибка при сохранении картинки: " + e.getMessage());
            }

            var uuid = UUID.randomUUID().toString();
            s3Service.uploadObject(uuid, tempFile);




            var user = userService.getOrCreateVkUser(vkUserId);
            var image = new Image(
                    uuid,
                    user,
                    generateImageRequest.getCreatedAt(),
                    generateImageRequest.getPrompt(),
                    generateImageRequest.getModel()
            );

            imageRepository.save(image);

            return image;
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            if (tempFile != null) {
                tempFile.delete();
            }
        }
    }

    public Page<Image> getImages(String vkUserId, int pageNumber, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
        var user = userService.getOrCreateVkUser(vkUserId);
        return imageRepository.findAllByVkUserId(user.getId(), pageable);
    }

    public Image getImage(String vkUserId, String objectId) {
        var user = userService.getOrCreateVkUser(vkUserId);
        var foundImage = imageRepository.findByObjectId(objectId);

        if (foundImage != null) {
            if (user.getId() != foundImage.getVkUser().getId()) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN);
            }
        }
        return foundImage;
    }
}
