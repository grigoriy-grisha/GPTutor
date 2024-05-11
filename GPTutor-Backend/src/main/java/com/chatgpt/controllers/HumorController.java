package com.chatgpt.controllers;

import com.chatgpt.entity.HumorEntity;
import com.chatgpt.entity.HumorEntityLike;
import com.chatgpt.entity.HumorType;
import com.chatgpt.entity.requests.HumorRequest;
import com.chatgpt.services.HumorService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class HumorController {
    @Autowired
    HumorService humorService;

    @PostMapping(path = "/humor")
    HumorEntity createHumorEntity(@RequestBody HumorRequest humorRequest, HttpServletRequest request) {
        return humorService.createHumorEntity((String) request.getAttribute("vkUserId"), humorRequest);
    }


    @PostMapping(path = "/humor/{id}/like")
    HumorEntityLike createHumorEntity(@PathVariable("id") UUID humorEntityId, HttpServletRequest request) {
        return humorService.createHumorEntityLike((String) request.getAttribute("vkUserId"), humorEntityId);
    }

    @DeleteMapping(path = "/humor/like/{id}")
    boolean deleteHumorEntity(@PathVariable("id") UUID likeId, HttpServletRequest request) {
        return humorService.deleteHumorEntityLike((String) request.getAttribute("vkUserId"), likeId);
    }

    @GetMapping(path = "/humor")
    Page<HumorEntity> getHumorEntities(@RequestParam(defaultValue = "0") int pageNumber,
                                       @RequestParam(defaultValue = "10") int pageSize,
                                       @RequestParam() List<HumorType> types) {
        return humorService.getHumorEntities(types, pageNumber, pageSize);
    }

    @GetMapping(path = "/humor/top")
    Page<HumorEntity> getHumorEntities(@RequestParam(defaultValue = "0") int pageNumber,
                                       @RequestParam(defaultValue = "10") int pageSize) {
        return humorService.getTopHumorEntities(pageNumber, pageSize);
    }
}
