package com.chatgpt.services;

import org.springframework.stereotype.Service;

@Service()
public class VkSecretesService {
    String getSecretKey(String appId) {
        return System.getenv("APP_SECRET_"+ appId);
    }

    String getAuthKey(String appId) {
        return System.getenv("APP_AUTH_KEY_"+ appId);
    }

}
