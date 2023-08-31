package com.chatgpt.controllers;

import com.chatgpt.entity.ApiKey;
import com.chatgpt.entity.ApiRequest;
import com.chatgpt.services.ApiKeysService;
import com.chatgpt.services.ApiRequestsService;
import com.chatgpt.websockets.OnlineWebsocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AnalyticsController {
    @Autowired
    ApiRequestsService apiRequestsService;

    @Autowired
    ApiKeysService apiKeysService;

    @Autowired
    private OnlineWebsocketHandler onlineWebsocketHandler;

    @GetMapping(path = "/analytics/online")
    public int getOnlineUsers() {
        return onlineWebsocketHandler.getOnlineUsers().size();
    }

    @GetMapping(path = "/analytics/keys/{keyType}")
    public List<ApiKey> getAnalyticsKey(@PathVariable("keyType") String keyType) {
        return apiKeysService.getHiddenApiKeysMap(keyType);
    }

    @GetMapping(path = "/analytics/api-requests")
    public ArrayList<ApiRequest> getApiRequests() {
        return apiRequestsService.getApiRequests();
    }

}
