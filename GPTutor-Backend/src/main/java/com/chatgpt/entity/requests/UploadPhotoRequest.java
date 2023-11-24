package com.chatgpt.entity.requests;

import java.util.UUID;

public class UploadPhotoRequest {
    String uploadUrl;
    UUID imageId;

    public String getUploadUrl() {
        return uploadUrl;
    }

    public void setUploadUrl(String uploadUrl) {
        this.uploadUrl = uploadUrl;
    }

    public UUID getImageId() {
        return imageId;
    }

    public void setImageId(UUID imageId) {
        this.imageId = imageId;
    }
}
