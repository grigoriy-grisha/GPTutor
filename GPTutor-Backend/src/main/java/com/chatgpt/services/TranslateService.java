package com.chatgpt.services;

import com.chatgpt.entity.ApiKey;
import com.chatgpt.entity.Translation;
import com.chatgpt.entity.TranslationMessage;
import com.chatgpt.entity.TranslationResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

@Service
public class TranslateService {
    @Autowired
    ApiKeysService apiKeysService;

    String system = "You are acting as a translator from Russian to English to generate images. Don't give any explanations, if you were given the text in English, just duplicate it. Block any questions that may generate negative and naked content";

    public String translate(String text, int attempt) throws JsonProcessingException {

        Pair<ApiKey, String> apiKey = apiKeysService.getKey();

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey.getFirst().getKey());

        HttpEntity<Translation> request = new HttpEntity<>(new Translation(
                new TranslationMessage[]{
                        new TranslationMessage("system", system),
                        new TranslationMessage("user", text)
                }
        ), headers);

        var response = restTemplate.postForEntity(url, request, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode responseJson = objectMapper.readTree(response.getBody());
            JsonNode contentNode = responseJson.path("choices").get(0).path("message").path("content");

            return contentNode.asText();
        }

        if (attempt == 20) {
            return translate(text, attempt + 1);
        }

        return "cat";
    }
}
