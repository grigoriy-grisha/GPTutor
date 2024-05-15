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
        return "vk1.a.X6zGIOS6VGe7nYHXCkNd-G5mJKBaW9bpGBfnCRg5SF8ppke6rUvzml30SE8pZU-eEdXt6y4QNelAWbYOgCyrk0y0DbW2HCpRtKLZI0bjDZmI967E7Pruv8TuLpn8IkgT4dSFGsp421Knwxz_yklOWZFvh6lbRvqwGr-dnqbX9KAlTmmk1hc9DL3DGCW_M9E1B6PkYbEw6ldy9hWCq47wrA";
    }
}

