package com.chatgpt.services;


import com.chatgpt.entity.ApiRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ApiRequestsService {
    private final ArrayList<ApiRequest> apiRequestsList = new ArrayList<>();

    public void addApiRequest(String type, int status) {
        this.apiRequestsList.add(new ApiRequest(type, status));
    }

    public ArrayList<ApiRequest> getApiRequests() {
        return this.apiRequestsList;
    }
}
