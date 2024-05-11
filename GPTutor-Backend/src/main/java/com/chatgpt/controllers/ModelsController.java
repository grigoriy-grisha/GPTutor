package com.chatgpt.controllers;

import com.chatgpt.entity.common.Model;
import com.chatgpt.services.ConversationsService;
import com.chatgpt.services.ModelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ModelsController {
    @Autowired
    ConversationsService conversationsService;

    @Autowired
    ModelsService modelsService;

    @GetMapping(path = "/models")
    public Model[] getConversation() {
        return modelsService.getModels();
    }
}
