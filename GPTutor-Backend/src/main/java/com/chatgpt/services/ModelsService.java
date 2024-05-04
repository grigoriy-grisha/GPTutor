package com.chatgpt.services;

import com.chatgpt.entity.common.Model;
import com.chatgpt.entity.responses.CommonResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

@Service
public class ModelsService {
    @Value("${models.url}")
    String modelsUrl;

    RestTemplate restTemplate = new RestTemplate();

    public Model[] getModels() {
        var modelResponse =restTemplate.exchange(
                modelsUrl + "/llm",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<CommonResponse<Model[]>>() {}
        );

        return Objects.requireNonNull(modelResponse.getBody()).getResponse();
    }
}
