package com.chatgpt.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String url;
    private Timestamp expire;
    private Timestamp createdAt;
    String modelId;
    String prompt;
    String originalPrompt;
    String scheduler;
    String negativePrompt;
    int guidanceScale;
    String generatedSeed;
    String seed;
    int numInferenceSteps;
    int width;
    int height;

    String upscale;
    @ManyToOne()
    private VkUser vkUser;

    public Image() {

    }

    public Image(String url, VkUser vkUser, String generatedSeed, GenerateImageRequest generateImageRequest) {
        this.url = url;
        this.vkUser = vkUser;
        this.expire = generateImageRequest.getExpireTimestamp();
        this.createdAt = generateImageRequest.getCreatedAt();
        this.prompt = generateImageRequest.getPrompt();
        this.modelId = generateImageRequest.getModelId();
        this.scheduler = generateImageRequest.getScheduler();
        this.negativePrompt = generateImageRequest.getNegativePrompt();
        this.seed = generateImageRequest.getSeed();
        this.generatedSeed = generatedSeed;
        this.guidanceScale = generateImageRequest.getGuidanceScale();
        this.width = generateImageRequest.getWidth();
        this.height = generateImageRequest.getHeight();
        this.upscale = generateImageRequest.getUpscale();
        this.numInferenceSteps = generateImageRequest.getNumInferenceSteps();
        this.originalPrompt = generateImageRequest.getOriginalPrompt();
    }


    public VkUser getVkUser() {
        return vkUser;
    }

    public void setVkUser(VkUser vkUser) {
        this.vkUser = vkUser;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Timestamp getExpire() {
        return expire;
    }

    public void setExpire(Timestamp expire) {
        this.expire = expire;
    }

    public String getModelId() {
        return modelId;
    }

    public void setModelId(String modelId) {
        this.modelId = modelId;
    }

    public String getScheduler() {
        return scheduler;
    }

    public void setScheduler(String scheduler) {
        this.scheduler = scheduler;
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

    public String getGeneratedSeed() {
        return generatedSeed;
    }

    public void setGeneratedSeed(String generatedSeed) {
        this.generatedSeed = generatedSeed;
    }
}
