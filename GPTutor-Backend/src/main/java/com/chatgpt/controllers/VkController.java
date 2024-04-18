package com.chatgpt.controllers;

import com.chatgpt.entity.requests.UploadPhotoRequest;
import com.chatgpt.entity.responses.OrderSubscriptionResponse;
import com.chatgpt.entity.responses.UploadFileResponse;
import com.chatgpt.services.VkService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class VkController {

    @Autowired
    VkService vkService;

    @GetMapping(path = "/vk/groups-is-member")
    ResponseEntity<Boolean> groupsIsMember(@RequestParam String groupId, @RequestParam String userId) throws Exception {
        return ResponseEntity.ok().body(vkService.groupIsMember(groupId, userId));
    }

    @PostMapping(path = "/vk/upload-photo")
    ResponseEntity<UploadFileResponse> uploadPhoto(@RequestBody UploadPhotoRequest uploadPhotoRequest) throws JsonProcessingException {
        return ResponseEntity.ok().body(vkService.uploadVkPhoto(uploadPhotoRequest));

    }

    @GetMapping(path = "/vk/user-subscriptions")
    ResponseEntity<OrderSubscriptionResponse> getUserSubscriptions(HttpServletRequest request) throws Exception {
        return ResponseEntity.ok().body(vkService.getUserSubscriptions((String) request.getAttribute("vkUserId")));
    }
}
