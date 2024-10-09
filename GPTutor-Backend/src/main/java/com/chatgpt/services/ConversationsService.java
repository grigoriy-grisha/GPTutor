package com.chatgpt.services;

import com.chatgpt.entity.ApiKey;
import com.chatgpt.entity.ChatGptRequest;
import com.chatgpt.entity.ConversationRequest;
import com.chatgpt.entity.requests.QuestionRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.util.Map;

import static org.yaml.snakeyaml.nodes.Tag.STR;

@Service
public class ConversationsService {
    @Value("${models.url}")
    String modelsUrl;

    @Value("${rag.url}")
    String ragUrl;

    @Value("${master-token}")
    String masterToken;

    @Autowired
    ApiRequestsService apiRequestsService;

    @Autowired
    ApiKeysService apiKeysService;

    @Autowired
    SubscriptionsImagesService subscriptionsImagesService;

    public SseEmitter getConversation(ConversationRequest conversationRequest, String userId) throws IOException {
        Utf8SseEmitter emitter = new Utf8SseEmitter();

        fetchCompletion(emitter, conversationRequest, userId, 0);

        return emitter;
    }

    String getCompletionUrl(String model) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        if (request.getAttribute("isTG").equals(true)) {
            return "https://api.deep-foundation.tech/v1/chat/completions";
        }

        return model.startsWith("gpt") || model.startsWith("meta-llama") ? "https://api.deep-foundation.tech/v1/chat/completions" : modelsUrl + "/llm";
    }

    String getAPIToken() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        if (request.getAttribute("isTG").equals(true)) {
            return this.getUserToken();
        }

        Pair<ApiKey, String> apiKey = apiKeysService.getKey();

        return apiKey.getFirst().getKey();
    }

    String getUserToken() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        String userId = request.getAttribute("vkUserId").toString().substring(2);
        System.out.println(userId);

        String url = String.format("https://api.deep-foundation.tech/token/admin?userId=%s&masterToken=%s", userId, this.masterToken);
        System.out.println(url);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        String responseBody = responseEntity.getBody();

        ObjectMapper mapper = new ObjectMapper();

        try {
            JsonNode jsonMap = mapper.readTree(responseBody);

            return jsonMap.get("id").asText();
        } catch (Exception e) {
            return "";
        }
    }

    public void fetchCompletion(Utf8SseEmitter emitter, ConversationRequest conversationRequest, String userId, int attempt) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();


        ChatGptRequest chatGptRequest = new ChatGptRequest(
                conversationRequest.getModel(),
                conversationRequest.getMessages(),
                true
        );

        System.out.println(this.getCompletionUrl(conversationRequest.getModel()));

        System.out.println(this.getAPIToken());
        String input = mapper.writeValueAsString(chatGptRequest);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(this.getCompletionUrl(conversationRequest.getModel())))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + this.getAPIToken())
                .POST(HttpRequest.BodyPublishers.ofString(input))
                .build();

        HttpClient.newHttpClient().sendAsync(request, respInfo ->
        {
            System.out.println(respInfo.statusCode());
            if (respInfo.statusCode() == 200) {
                return new SseSubscriber((data) -> {
                    SseEmitter.SseEventBuilder event = SseEmitter.event()
                            .data(data);

                    if (data.equals("[DONE]")) emitter.complete();
                    try {
                        emitter.send(event);
                    } catch (IOException e) {
                        emitter.completeWithError(e);
                    }
                });
            }

            try {
                if (attempt == 100) {
                    emitter.send("[Error]:[" + respInfo.statusCode() + "]");
                    emitter.complete();
                    return null;
                }

                Thread.sleep(200);
                fetchCompletion(emitter, conversationRequest, userId, attempt + 1);
            } catch (IOException | InterruptedException e) {
                emitter.completeWithError(e);
            }


            return null;
        });
    }

    public String getConversationVKDoc(QuestionRequest questionRequest) {
        RestTemplate restTemplate = new RestTemplate();

        String url = ragUrl + "/doc-question";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<QuestionRequest> requestEntity = new HttpEntity<>(questionRequest, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        return response.getBody();
    }
};
