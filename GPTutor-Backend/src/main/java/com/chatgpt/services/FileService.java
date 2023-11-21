package com.chatgpt.services;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;

@Service
public class FileService {
    File downloadImage(String base64Data) {
        File tempFile = null;

        try {
            byte[] imageBytes = Base64.getDecoder().decode(base64Data.split(",")[1]);
            if (imageBytes != null) {
                tempFile = File.createTempFile("image-", ".png");
                Files.write(tempFile.toPath(), imageBytes);
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
