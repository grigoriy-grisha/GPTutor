package com.chatgpt.entity.requests;

public class NudeDetectRequest {
    String url;

    public NudeDetectRequest(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
