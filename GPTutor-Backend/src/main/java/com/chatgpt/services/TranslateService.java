package com.chatgpt.services;

import com.chatgpt.entity.Translation;
import com.chatgpt.entity.TranslationResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

@Service
public class TranslateService {
    public String translate(String text) {

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://translate:5000/translate";

        var response = restTemplate.postForEntity(url, new Translation(text), TranslationResult.class);


        if (response.getStatusCode().is2xxSuccessful()) {
            return Objects.requireNonNull(response.getBody()).getTranslatedText();
        }

        return text;
    }
}
