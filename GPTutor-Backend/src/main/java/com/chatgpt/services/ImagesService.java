package com.chatgpt.services;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.Exceptions.NotAFoundException;
import com.chatgpt.entity.GenerateImageRequest;
import com.chatgpt.entity.GenerateImageResponse;
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
import java.util.Arrays;
import java.util.List;
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

    public List<Image> generateImage(String vkUserId, GenerateImageRequest generateImageRequest) {
        if (badListService.checkText(generateImageRequest.getPrompt())) {
            throw new BadRequestException("Запрос содержит неприемлемое содержимое");
        }

        try {

            var images = generateImage(generateImageRequest);
            return Arrays
                    .stream(images)
                    .map((image) -> createImage(image, vkUserId, generateImageRequest))
                    .toList();
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

    String[] generateImage(GenerateImageRequest generateImageRequest) throws JsonProcessingException {
        String urlGenerate = "http://models:1337/image";
        HttpEntity<GenerateImageRequest> requestImage = new HttpEntity<>(generateImageRequest);
        var responseImage = restTemplate.postForEntity(urlGenerate, requestImage, String.class);

        ObjectMapper objectMapper = new ObjectMapper();

        GenerateImageResponse imageResponse = objectMapper.readValue(responseImage.getBody(), GenerateImageResponse.class);

        return imageResponse.getOutput();
    }

}
