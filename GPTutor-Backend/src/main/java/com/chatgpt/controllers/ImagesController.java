package com.chatgpt.controllers;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.entity.GenerateImageRequest;
import com.chatgpt.entity.Image;
import com.chatgpt.services.ImagesService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ImagesController {
    @Autowired
    ImagesService imagesService;


    @PostMapping(path = "/image")
    Image generateImage(@RequestBody GenerateImageRequest prompt, HttpServletRequest request) {
        return imagesService.generateImage((String) request.getAttribute("vkUserId"), prompt);
    }

    @GetMapping(path = "/image/{id}")
    Image getImage(@PathVariable("id") String objectId, HttpServletRequest request) {
        return imagesService.getImage((String) request.getAttribute("vkUserId"), objectId);
    }

    @GetMapping(path = "/image")
    Page<Image> getImage(HttpServletRequest request,
                         @RequestParam(defaultValue = "0") int pageNumber,
                         @RequestParam(defaultValue = "10") int pageSize) {

        return imagesService.getImages((String) request.getAttribute("vkUserId"),
                pageNumber,
                pageSize
        );
    }
}
