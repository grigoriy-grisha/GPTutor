package com.chatgpt.controllers;

import com.chatgpt.entity.AttemptsResponse;
import com.chatgpt.entity.VkUser;
import com.chatgpt.services.AttemptsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AttemptsController {

    @Autowired
    AttemptsService attemptsService;

    @PostMapping(path = "/attempts/free")
    public ResponseEntity<VkUser> freeUpdateAttempts(HttpServletRequest request) {
        return ResponseEntity.ok(attemptsService.freeUpdateAttempts((String) request.getAttribute("vkUserId")));
    }

    @GetMapping(path = "/attempts")
    public ResponseEntity<AttemptsResponse> getAttempts(HttpServletRequest request) {
        return ResponseEntity.ok(attemptsService.getAttempts((String) request.getAttribute("vkUserId")));
    }
}
