package com.chatgpt.services;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.Exceptions.NotAFoundException;
import com.chatgpt.entity.GenerateImageRequest;
import com.chatgpt.entity.GenerateImageResponse;
import com.chatgpt.entity.Image;
import com.chatgpt.repositories.ImageRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;
import java.util.*;

@Service
public class ImagesService {


    @Value("${models.url}")
    String modelsUrl;

    @Autowired
    SubscriptionsImagesService subscriptionsImagesService;

    RestTemplate restTemplate = new RestTemplate();

    @Autowired
    FileService fileService;

    @Autowired
    BadListService badListService;

    @Autowired
    TranslateService translateService;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    UserService userService;


    @Transactional
    public List<Image> generateImage(String vkUserId, GenerateImageRequest generateImageRequest) {
        if (badListService.checkText(generateImageRequest.getPrompt())) {
            throw new BadRequestException("Запрос содержит неприемлемое содержимое");
        }

        try {
            var pair = getGeneratedImage(generateImageRequest);

            return Arrays
                    .stream(pair.getFirst())
                    .map((image) -> createImage(image, vkUserId, pair.getSecond(), generateImageRequest))
                    .toList();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    Image createImage(String url, String vkUserId, String generatedSeed, GenerateImageRequest generateImageRequest) {
        var user = userService.getOrCreateVkUser(vkUserId);
        var image = new Image(url, user, generatedSeed, generateImageRequest);

        var rgb = getAvgImageColor(image.getUrl());

        image.setPublishing(!Objects.equals(rgb, "0, 0, 0"));
        image.setRbg(rgb);


        imageRepository.save(image);

        return image;
    }

    Optional<Image> getImageById(UUID id) {
        return imageRepository.findById(id);
    }


    public Page<Image> getImages(String vkUserId, int pageNumber, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
        var user = userService.getOrCreateVkUser(vkUserId);
        return imageRepository.findAllByVkUserId(user.getId(), pageable);
    }

    public Pair<String[], String> getGeneratedImage(GenerateImageRequest generateImageRequest) throws JsonProcessingException {
        String urlGenerate;

        if (Objects.equals(generateImageRequest.getModelId(), "dalle3")) {
            urlGenerate = modelsUrl + "/dalle";
        } else {
            urlGenerate = modelsUrl + "/image";
        }

        HttpEntity<GenerateImageRequest> requestImage = new HttpEntity<>(generateImageRequest);
        var responseImage = restTemplate.postForEntity(urlGenerate, requestImage, String.class);

        ObjectMapper objectMapper = new ObjectMapper();

        GenerateImageResponse imageResponse = objectMapper.readValue(responseImage.getBody(), GenerateImageResponse.class);

        JsonNode response = objectMapper.readTree(responseImage.getBody());
        JsonNode meta = response.get("meta");
        JsonNode seed = meta != null ? meta.get("seed") : null;

        return Pair.of(imageResponse.getOutput(), seed != null ? seed.asText() : "-1");
    }


    public String getImageBase64(UUID id) {
        var image = imageRepository.findById(id);
        if (image.isEmpty()) {
            throw new NotAFoundException("Изображение не найдено");
        }

        return fileService.downloadImageAsBase64(image.get().getUrl());
    }

    public Page<Image> getPublishingImages(String queryPrompt, int pageNumber, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
        return imageRepository.findByPromptContainingAndIsPublishingIsTrueOrOriginalPromptContainingAndIsPublishingIsTrue(queryPrompt, queryPrompt, pageable);
    }

    String getAvgImageColor(String urlValue) {
        try {
            URL url = new URL(urlValue);
            BufferedImage image = ImageIO.read(url);

            int totalRed = 0;
            int totalGreen = 0;
            int totalBlue = 0;
            int totalPixels = image.getWidth() * image.getHeight();

            for (int y = 0; y < image.getHeight(); y++) {
                for (int x = 0; x < image.getWidth(); x++) {
                    int color = image.getRGB(x, y);
                    totalRed += (color >> 16) & 0xFF;
                    totalGreen += (color >> 8) & 0xFF;
                    totalBlue += color & 0xFF;
                }
            }

            int averageRed = totalRed / totalPixels;
            int averageGreen = totalGreen / totalPixels;
            int averageBlue = totalBlue / totalPixels;

            return averageRed + ", " + averageGreen + ", " + averageBlue;

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }
}
