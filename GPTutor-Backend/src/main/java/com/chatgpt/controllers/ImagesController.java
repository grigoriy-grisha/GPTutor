package com.chatgpt.controllers;

import com.chatgpt.entity.GenerateImageRequest;
import com.chatgpt.entity.Image;
import com.chatgpt.services.ImagesService;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class ImagesController {
    @Autowired
    ImagesService imagesService;

    @PostMapping(path = "/image")
    List<Image> generateImage(@RequestBody GenerateImageRequest prompt, HttpServletRequest request) throws Exception {
        return imagesService.generateImage((String) request.getAttribute("vkUserId"), prompt);
    }


    @GetMapping(path = "/image")
    Page<Image> getImages(HttpServletRequest request,
                          @RequestParam(defaultValue = "0") int pageNumber,
                          @RequestParam(defaultValue = "10") int pageSize) {

        return imagesService.getImages((String) request.getAttribute("vkUserId"),
                pageNumber,
                pageSize
        );
    }
}
