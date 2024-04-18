package com.chatgpt.controllers;

import com.chatgpt.entity.ConversationRequest;
import com.chatgpt.services.ConversationsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class ConversationController {
    @Autowired
    ConversationsService conversationsService;

    @PostMapping(path = "/conversation", consumes = MediaType.APPLICATION_JSON_VALUE)
    public <T> T getConversation(@RequestBody ConversationRequest conversationRequest, HttpServletRequest request) throws IOException {
        return (T) conversationsService.getConversation(conversationRequest, (String) request.getAttribute("vkUserId"));
    }
}
