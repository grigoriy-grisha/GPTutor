package com.chatgpt.services;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.entity.GenerateImageRequest;
import com.chatgpt.entity.Image;
import com.chatgpt.repositories.ImageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
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
        String fileUrl = "http://models:1337/image";
        File tempFile = null;

        try {

            if (badListService.checkText(generateImageRequest.getPrompt())) {
                throw new BadRequestException("Запрос содержит неприемлемое содержимое");
            }

            var prompt = translateService.translate(generateImageRequest.getPrompt(), 0);
            generateImageRequest.setPrompt(prompt);

            if (badListService.checkText(generateImageRequest.getPrompt())) {
                throw new BadRequestException("Запрос содержит неприемлемое содержимое");
            }

            System.out.println(prompt);
            URL url = new URL(fileUrl);

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setRequestProperty("Content-Type", "application/json");

            ObjectMapper mapper = new ObjectMapper();

            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(mapper.writeValueAsString(generateImageRequest).getBytes());
            outputStream.close();


            InputStream inputStream = connection.getInputStream();

            tempFile = File.createTempFile("temp-", ".png");

            Files.write(tempFile.toPath(), inputStream.readAllBytes());

            inputStream.close();

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
