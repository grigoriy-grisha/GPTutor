package com.chatgpt.entity;

import java.sql.Timestamp;

public class GenerateImageRequest {
    String loraModel;

    Timestamp createdAt;
    Timestamp expireTimestamp;
    String modelId;
    String prompt;
    String originalPrompt;
    String scheduler;
    String negativePrompt;
    int guidanceScale;
    String seed;
    int numInferenceSteps;
    int width;
    int height;

    int samples;

    String upscale;

    public String getModelId() {
        return modelId;
    }

    public void setModelId(String modelId) {
        this.modelId = modelId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getExpireTimestamp() {
        return expireTimestamp;
    }

    public void setExpireTimestamp(Timestamp expireTimestamp) {
        this.expireTimestamp = expireTimestamp;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getScheduler() {
        return scheduler;
    }

    public void setScheduler(String scheduler) {
        this.scheduler = scheduler;
    }

    public String getNegativePrompt() {
        return negativePrompt;
    }

    public void setNegativePrompt(String negativePrompt) {
        this.negativePrompt = negativePrompt;
    }


    public String getSeed() {
        return seed;
    }

    public void setSeed(String seed) {
        this.seed = seed;
    }

    public int getNumInferenceSteps() {
        return numInferenceSteps;
    }

    public void setNumInferenceSteps(int numInferenceSteps) {
        this.numInferenceSteps = numInferenceSteps;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getSamples() {
        return samples;
    }

    public void setSamples(int samples) {
        this.samples = samples;
    }

    public String getUpscale() {
        return upscale;
    }

    public void setUpscale(String upscale) {
        this.upscale = upscale;
    }

    public int getGuidanceScale() {
        return guidanceScale;
    }

    public void setGuidanceScale(int guidanceScale) {
        this.guidanceScale = guidanceScale;
    }

    public String getOriginalPrompt() {
        return originalPrompt;
    }

    public void setOriginalPrompt(String originalPrompt) {
        this.originalPrompt = originalPrompt;
    }

    public String getLoraModel() {
        return loraModel;
    }

    public void setLoraModel(String loraModel) {
        this.loraModel = loraModel;
    }
}
