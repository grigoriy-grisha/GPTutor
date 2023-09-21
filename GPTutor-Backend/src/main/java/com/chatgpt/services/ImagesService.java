package com.chatgpt.services;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.Exceptions.NotAFoundException;
import com.chatgpt.entity.GenerateImageRequest;
import com.chatgpt.entity.Image;
import com.chatgpt.entity.requests.NudeDetectRequest;
import com.chatgpt.repositories.ImageRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
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

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.UUID;

@Service
public class ImagesService {
    RestTemplate restTemplate = new RestTemplate();

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

    public Image saveImage(UUID imageId) {
        File tempFile = null;

        try {

            var imageOptional = imageRepository.findById(imageId);
            if (imageOptional.isEmpty()) {
                throw new NotAFoundException("Изображение не найдено");
            }

            var image = imageOptional.get();

            try {
                ResponseEntity<byte[]> response = restTemplate.getForEntity(image.getUrl(), byte[].class);
                if (response.getStatusCode() == HttpStatus.OK) {
                    byte[] imageBytes = response.getBody();
                    if (imageBytes != null) {
                        tempFile = File.createTempFile("image-", ".png");
                        Files.write(tempFile.toPath(), imageBytes);
                    }
                }
            } catch (IOException e) {
                System.out.println("Ошибка при сохранении картинки: " + e.getMessage());
                if (tempFile != null) {
                    tempFile.delete();
                }
            }

            var uuid = UUID.randomUUID().toString();
            s3Service.uploadObject(uuid, tempFile);

            image.setUrl(s3Service.getBucketUrl(uuid));
            image.setExpire(null);

            imageRepository.save(image);

            return image;
        } finally {
            if (tempFile != null) {
                tempFile.delete();
            }
        }

    }

    public Image generateImage(String vkUserId, GenerateImageRequest generateImageRequest) {
        if (badListService.checkText(generateImageRequest.getPrompt())) {
            throw new BadRequestException("Запрос содержит неприемлемое содержимое");
        }

        try {
            generateImageRequest.setPrompt(
                    translateService.translate(
                            generateImageRequest.getPrompt(),
                            0
                    )
            );
        } catch (Exception e) {
            throw new BadRequestException("Компонент переводов не активен, напишите свой запрос на английском");
        }

        try {
            var imageUrl = generateImage(generateImageRequest);
            checkNude(imageUrl);
            return createImage(imageUrl, vkUserId, generateImageRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    Image createImage(String url, String vkUserId, GenerateImageRequest generateImageRequest) {
        var user = userService.getOrCreateVkUser(vkUserId);
        var image = new Image(url, user, generateImageRequest);

        imageRepository.save(image);

        return image;
    }

    public Page<Image> getImages(String vkUserId, int pageNumber, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
        var user = userService.getOrCreateVkUser(vkUserId);
        return imageRepository.findAllByVkUserId(user.getId(), pageable);
    }

    String generateImage(GenerateImageRequest generateImageRequest) throws JsonProcessingException {
        String urlGenerate = "http://models:1337/image";
        HttpEntity<GenerateImageRequest> requestImage = new HttpEntity<>(generateImageRequest);
        var responseImage = restTemplate.postForEntity(urlGenerate, requestImage, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(responseImage.getBody());

        return objectMapper.readTree(responseImage.getBody()).get("url").asText();
    }

    void checkNude(String imageUrl) throws JsonProcessingException {
        String urlNudeDetect = "http://models:1337/nude-detect";
        HttpEntity<NudeDetectRequest> request = new HttpEntity<>(new NudeDetectRequest(imageUrl));

        var responseNude = restTemplate.postForEntity(urlNudeDetect, request, String.class);

        if (responseNude.getStatusCode().is2xxSuccessful()) {
            boolean isNude = new ObjectMapper().readTree(responseNude.getBody()).get("isNude").asBoolean();

            if (isNude) {
                throw new BadRequestException("Изображение содержит непримелимое содержание, попробуйте еще");
            }
        }
    }

}
