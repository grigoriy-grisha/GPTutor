package com.chatgpt.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class FileService {
    RestTemplate restTemplate = new RestTemplate();

    File downloadImage(String url) {
        File tempFile = null;

        try {
            ResponseEntity<byte[]> response = restTemplate.getForEntity(url, byte[].class);
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
                return null;
            }
        }

        return tempFile;
    }
}
