package com.chatgpt.controllers;

import com.chatgpt.entity.database.AdditionalRequests;
import com.chatgpt.entity.requests.CreateAdditionalRequest;
import com.chatgpt.entity.requests.UpdateAdditionalRequest;
import com.chatgpt.services.AdditionalRequestsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class AdditionalRequestController {

    @Autowired
    AdditionalRequestsService additionalRequestsService;

    @PostMapping(path = "/additional-request")
    public AdditionalRequests createAdditionalRequest(HttpServletRequest request, @RequestBody CreateAdditionalRequest createAdditionalRequest) {
        return additionalRequestsService.createAdditionalRequest((String) request.getAttribute("vkUserId"), createAdditionalRequest);
    }

    @GetMapping(path = "/additional-request")
    public List<AdditionalRequests> getAdditionalRequest(HttpServletRequest request) {
        return additionalRequestsService.getAdditionalRequest((String) request.getAttribute("vkUserId"));
    }

    @DeleteMapping(path = "/additional-request/{id}")
    public void getAdditionalRequest(HttpServletRequest request, @PathVariable("id") UUID historyId) {
        additionalRequestsService.deleteAdditionalRequest((String) request.getAttribute("vkUserId"), historyId);
    }

    @PutMapping(path = "/additional-request")
    public void getAdditionalRequest(HttpServletRequest request, @RequestBody UpdateAdditionalRequest updateAdditionalRequest) {
        additionalRequestsService.updateAdditionalRequest((String) request.getAttribute("vkUserId"), updateAdditionalRequest);
    }
}