package com.chatgpt.services;

import com.chatgpt.entity.ApiKey;
import com.chatgpt.entity.ChatGptRequest;
import com.chatgpt.entity.ConversationRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;

@Service
public class ConversationsService {
    @Autowired
    ApiRequestsService apiRequestsService;

    @Autowired
    ApiKeysService apiKeysService;

    public SseEmitter getConversation(ConversationRequest conversationRequest) throws IOException {
        Utf8SseEmitter emitter = new Utf8SseEmitter();

        fetchCompletion(emitter, conversationRequest, 0);

        return emitter;
    }

    public void fetchCompletion(Utf8SseEmitter emitter, ConversationRequest conversationRequest, int attempt) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        Pair<ApiKey, String> apiKey = apiKeysService.getKey();

        ChatGptRequest chatGptRequest = new ChatGptRequest(
                "gpt-3.5-turbo",
                conversationRequest.getMessages(),
                true
        );


        System.out.println(apiKey.getFirst().getKey());
        String input = mapper.writeValueAsString(chatGptRequest);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey.getFirst().getKey())
                .POST(HttpRequest.BodyPublishers.ofString(input))
                .build();

        System.out.println(apiKey.getFirst().getKey());

        HttpClient.newHttpClient().sendAsync(request, respInfo ->
        {
            apiRequestsService.addApiRequest("OfficialGPT", respInfo.statusCode());

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
                if (attempt == 50) {
                    emitter.send("[Error]:[" + respInfo.statusCode() + "]");
                    emitter.complete();
                    return null;
                }

                Thread.sleep(1000);
                fetchCompletion(emitter, conversationRequest, attempt + 1);
            } catch (IOException | InterruptedException e) {
                emitter.completeWithError(e);
            }


            return null;
        });
    }
};
