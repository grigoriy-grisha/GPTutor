package com.chatgpt.controllers;

import com.chatgpt.entity.GenerateImageRequest;
import com.chatgpt.entity.Image;
import com.chatgpt.services.ImagesService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class ImagesController {
    @Autowired
    ImagesService imagesService;


    @PostMapping(path = "/image")
    List<Image> generateImage(@RequestBody GenerateImageRequest prompt, HttpServletRequest request) {
        return imagesService.generateImage((String) request.getAttribute("vkUserId"), prompt);
    }

    @PostMapping(path = "/image/{id}")
    Image saveImage(@PathVariable("id") UUID imageId) {
        return imagesService.saveImage(imageId);
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
