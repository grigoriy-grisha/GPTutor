package com.chatgpt.controllers;

import com.chatgpt.entity.requests.BadListRequest;
import com.chatgpt.services.BadListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BadListController {

    @Autowired
    BadListService badListService;

    @PostMapping(path = "/bad-list/check")
    public ResponseEntity<Boolean> setUserImageAgreement(@RequestBody BadListRequest request) {
        return ResponseEntity.ok().body(badListService.checkText(request.getText()));
    }
}