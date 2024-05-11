package com.chatgpt.services;

import com.chatgpt.entity.common.Model;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ModelsService {
    @Value("${models.url}")
    String modelsUrl;

    RestTemplate restTemplate = new RestTemplate();

    public Model[] getModels() {
        return restTemplate.getForEntity(modelsUrl + "/llm", Model[].class).getBody();
    }
}
