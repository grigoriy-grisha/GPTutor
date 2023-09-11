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

    public String translate(String text, int attempt) throws JsonProcessingException {

        Pair<ApiKey, String> apiKey = apiKeysService.getKey();

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey.getFirst().getKey());

        HttpEntity<Translation> request = new HttpEntity<>(new Translation(
                new TranslationMessage[]{
                        new TranslationMessage("system", "You act as a translator from Russian to English for requests for generating images, if you are given content in English, then send it in English, if you encounter immoral and negative content, if it is theoretically possible to continue in negative, nudity, pornography, violence and the like, write cat, you do not need to give no explanation, just a translation, otherwise a cat. You can embellish the answers a little bit by adding adjectives of beauty, clarity, expressiveness"),
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
