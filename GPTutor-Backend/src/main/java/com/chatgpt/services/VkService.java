package com.chatgpt.services;

import com.amazonaws.services.kms.model.NotFoundException;
import com.chatgpt.entity.requests.UploadPhotoRequest;
import com.chatgpt.entity.requests.WallPostRequest;
import com.chatgpt.entity.responses.OrderSubscriptionByIdResponse;
import com.chatgpt.entity.responses.OrderSubscriptionResponse;
import com.chatgpt.entity.responses.SaveWallPhotoResponse;
import com.chatgpt.entity.responses.UploadFileResponse;
import com.chatgpt.repositories.ImageRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class VkService {
    @Autowired
    ImageRepository imageRepository;

    @Autowired
    FileService fileService;

    @Autowired
    VkSecretesService vkSecretesService;

    RestTemplate restTemplate = new RestTemplate();


    //todo вынести этот метод на фронт
    public Boolean groupIsMember(String groupId, String userId) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.vk.com/method/groups.isMember"
                + "?group_id={groupId}&user_id={userId}&access_token={accessToken}&v={v}";

        Map<String, String> params = new HashMap<>();
        params.put("groupId", groupId);
        params.put("userId", userId);
        params.put("accessToken", vkSecretesService.getAuthKey());
        params.put("v", "5.131");

        String result = restTemplate.getForObject(url, String.class, params);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(result);

        System.out.println(result);

        return node.get("response").asBoolean();
    }

    public UploadFileResponse uploadVkPhoto(UploadPhotoRequest uploadPhotoRequest) throws JsonProcessingException {
        var image = imageRepository.findById(uploadPhotoRequest.getImageId());

        if (image.isEmpty()) {
            throw new NotFoundException("Изображение не найдено");
        }

        return uploadPhoto(image.get().getUrl(), uploadPhotoRequest.getUploadUrl());
    }

    public OrderSubscriptionResponse getUserSubscriptions(String userId) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.vk.com/method/orders.getUserSubscriptions"
                + "?user_id={userId}&access_token={accessToken}&v={v}";


        Map<String, String> params = new HashMap<>();
        params.put("userId", userId);
        params.put("accessToken", vkSecretesService.getAuthKey());
        params.put("v", "5.131");

        String response = restTemplate.getForObject(url, String.class, params);

        System.out.println(response);

        return new ObjectMapper().readValue(response, OrderSubscriptionResponse.class);
    }

    public OrderSubscriptionByIdResponse getUserSubscriptionById(String userId, String subscriptionId) throws Exception {
        System.out.println(vkSecretesService.getAuthKey());
        System.out.println(userId);

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.vk.com/method/orders.getUserSubscriptionById"
                + "?user_id={userId}&subscription_id={subscriptionId}&access_token={accessToken}&v={v}";


        Map<String, String> params = new HashMap<>();
        params.put("userId", userId);
        params.put("subscriptionId", subscriptionId);
        params.put("accessToken", vkSecretesService.getAuthKey());
        params.put("v", "5.199");

        String response = restTemplate.getForObject(url, String.class, params);

        System.out.println(response);

        return new ObjectMapper().readValue(response, OrderSubscriptionByIdResponse.class);
    }

    public UploadFileResponse uploadPhoto(String url, String uploadUrl) throws JsonProcessingException {
        var file = fileService.downloadImage(fileService.downloadImageAsBase64(url));

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("photo", new FileSystemResource(file));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        String response = restTemplate.postForObject(uploadUrl, requestEntity, String.class);

        return new ObjectMapper().readValue(response, UploadFileResponse.class);
    }

    public String wallPostGroup(WallPostRequest wallPostRequest) {
        MultiValueMap<String, String> postData = new LinkedMultiValueMap<>();
        postData.add("owner_id", wallPostRequest.getGroupId());
        postData.add("attachments", wallPostRequest.getAttachments());
        postData.add("message", wallPostRequest.getMessage());
        postData.add("access_token", vkSecretesService.getAiHumorKeyGroup());
        postData.add("v", "5.199");

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(postData, new HttpHeaders());

        return restTemplate.postForObject("https://api.vk.com/method/wall.post", entity, String.class);
    }
}
