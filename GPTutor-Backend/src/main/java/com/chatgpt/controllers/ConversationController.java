package com.chatgpt.controllers;

import com.chatgpt.entity.ConversationRequest;
import com.chatgpt.services.ApiKeysService;
import com.chatgpt.services.ConversationsService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@RestController
public class ConversationController {
    @Autowired
    ConversationsService conversationsService;

    @PostMapping(path = "/conversation", consumes = MediaType.APPLICATION_JSON_VALUE)
    @RateLimiter(name = "conversationLimit", fallbackMethod = "fallbackMethod")
    public <T> T getConversation(@RequestBody ConversationRequest conversationRequest) throws IOException {
        return (T) conversationsService.getConversation(conversationRequest);
    }

    public ResponseEntity<Object> fallbackMethod(Exception e) throws Exception {
        if (e != null) throw e;

        throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Too many requests");
    }

}
