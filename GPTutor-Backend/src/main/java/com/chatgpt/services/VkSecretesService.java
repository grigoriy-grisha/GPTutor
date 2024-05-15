package com.chatgpt.services;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service()
public class VkSecretesService {
    String getSecretKey(String appId) {
        return System.getenv("APP_SECRET_" + appId);
    }

    String getAuthKey() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        var appId = request.getAttribute("vkAppId");

        return System.getenv("APP_AUTH_KEY_" + appId);
    }

    String getAiHumorKeyGroup() {
        return System.getenv("AI_HUMOR_GROUP_TOKEN");
    }
}