package com.chatgpt.controllers;

import com.chatgpt.services.DeepService;
import com.chatgpt.services.SubscriptionsImagesService;
import com.chatgpt.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    SubscriptionsImagesService subscriptionsImagesService;

    @Autowired
    DeepService deepService;

    @Autowired
    UserService userService;

    @PostMapping(path = "/user/image-agreement")
    public ResponseEntity<Boolean> setUserImageAgreement(HttpServletRequest request) {
        return ResponseEntity.ok().body(userService.setUserImageAgreement((String) request.getAttribute("vkUserId")));
    }

    @GetMapping(path = "/user/image-agreement")
    public ResponseEntity<Boolean> getUserImageAgreement(HttpServletRequest request) {
        return ResponseEntity.ok().body(userService.getUserImageAgreement((String) request.getAttribute("vkUserId")));
    }

    @GetMapping(path = "/user/balance")
    public ResponseEntity<String> getUserBalance() {
        return ResponseEntity.ok().body(subscriptionsImagesService.getUserBalance());
    }
}
