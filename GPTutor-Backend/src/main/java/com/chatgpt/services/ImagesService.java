package com.chatgpt.services;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.Exceptions.NotAFoundException;
import com.chatgpt.entity.GenerateImageRequest;
import com.chatgpt.entity.GenerateImageResponse;
import com.chatgpt.entity.Image;
import com.chatgpt.entity.requests.NudeDetectRequest;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class ImagesService {


    @Value("${models.url}")
    String modelsUrl;

    @Autowired
    SubscriptionsImagesService subscriptionsImagesService;

    RestTemplate restTemplate = new RestTemplate();

    @Autowired
    BadListService badListService;

    @Autowired
    TranslateService translateService;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    UserService userService;


    @Transactional
    public List<Image> generateImage(String vkUserId, GenerateImageRequest generateImageRequest) throws JsonProcessingException {

        var normalisedGenerate = normaliseGenerateRequest(vkUserId, generateImageRequest);

        if (badListService.checkText(normalisedGenerate.getPrompt())) {
            throw new BadRequestException("Запрос содержит неприемлемое содержимое");
        }

        try {
            var pair = generateImage(normalisedGenerate);

            return Arrays
                    .stream(pair.getFirst())
                    .map((image) -> createImage(image, vkUserId, pair.getSecond(), normalisedGenerate))
                    .toList();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    Image createImage(String url, String vkUserId, String generatedSeed, GenerateImageRequest generateImageRequest) {
        var user = userService.getOrCreateVkUser(vkUserId);
        var image = new Image(url, user, generatedSeed, generateImageRequest);

        imageRepository.save(image);

        return image;
    }

    public Page<Image> getImages(String vkUserId, int pageNumber, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
        var user = userService.getOrCreateVkUser(vkUserId);
        return imageRepository.findAllByVkUserId(user.getId(), pageable);
    }

    Pair<String[], String> generateImage(GenerateImageRequest generateImageRequest) throws JsonProcessingException {
        String urlGenerate = modelsUrl + "/image";
        HttpEntity<GenerateImageRequest> requestImage = new HttpEntity<>(generateImageRequest);
        var responseImage = restTemplate.postForEntity(urlGenerate, requestImage, String.class);

        ObjectMapper objectMapper = new ObjectMapper();

        GenerateImageResponse imageResponse = objectMapper.readValue(responseImage.getBody(), GenerateImageResponse.class);

        System.out.println(responseImage.getBody());
        JsonNode response = objectMapper.readTree(responseImage.getBody());
        JsonNode meta = response.get("meta");
        JsonNode seed = meta != null ? meta.get("seed") : null;

        return Pair.of(imageResponse.getOutput(), seed != null ? seed.asText() : "-1");
    }

    public GenerateImageRequest normaliseGenerateRequest(String vkUserId, GenerateImageRequest generateImageRequest) throws JsonProcessingException {
        if (subscriptionsImagesService.isAvailableSubscription(vkUserId)) {
            return generateImageRequest;
        }

        generateImageRequest.setHeight(512);
        generateImageRequest.setWidth(512);
        generateImageRequest.setSamples(1);

        return generateImageRequest;
    }
}
