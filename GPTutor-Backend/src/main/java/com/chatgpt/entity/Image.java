package com.chatgpt.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String prompt;

    private String objectId;

    private String model;

    private Timestamp createdAt;

    private String sampler;

    private String negativePrompt;
    private int cfgScale;

    private int steps;

    private int seed;

    private String aspectRatio;


    @ManyToOne()
    private VkUser vkUser;

    public Image() {

    }

    public Image(String objectId, VkUser vkUser, GenerateImageRequest generateImageRequest) {
        this.objectId = objectId;
        this.vkUser = vkUser;
        this.createdAt = generateImageRequest.getCreatedAt();
        this.prompt = generateImageRequest.getPrompt();
        this.model = generateImageRequest.getModel();
        this.sampler = generateImageRequest.getSampler();
        this.negativePrompt = generateImageRequest.getNegativePrompt();
        this.seed = generateImageRequest.getSeed();
        this.cfgScale = generateImageRequest.getCfgScale();
        this.aspectRatio = generateImageRequest.getAspectRatio();
        this.steps = generateImageRequest.getSteps();
    }


    public VkUser getVkUser() {
        return vkUser;
    }

    public void setVkUser(VkUser vkUser) {
        this.vkUser = vkUser;
    }

    public String getObjectId() {
        return objectId;
    }

    public void setObjectId(String objectId) {
        this.objectId = objectId;
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

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getSampler() {
        return sampler;
    }

    public void setSampler(String sampler) {
        this.sampler = sampler;
    }

    public String getNegativePrompt() {
        return negativePrompt;
    }

    public void setNegativePrompt(String negativePrompt) {
        this.negativePrompt = negativePrompt;
    }

    public int getCfgScale() {
        return cfgScale;
    }

    public void setCfgScale(int cfgScale) {
        this.cfgScale = cfgScale;
    }

    public int getSeed() {
        return seed;
    }

    public void setSeed(int seed) {
        this.seed = seed;
    }

    public String getAspectRatio() {
        return aspectRatio;
    }

    public void setAspectRatio(String aspectRatio) {
        this.aspectRatio = aspectRatio;
    }


    public int getSteps() {
        return steps;
    }

    public void setSteps(int steps) {
        this.steps = steps;
    }
}
