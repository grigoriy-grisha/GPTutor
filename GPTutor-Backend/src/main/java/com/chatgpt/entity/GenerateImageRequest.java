package com.chatgpt.entity;

import java.sql.Timestamp;

public class GenerateImageRequest {
    String model;
    Timestamp createdAt;
    String prompt;
    String sampler;
    String negativePrompt;
    int cfgScale;

    int seed;

    int steps;

    String aspectRatio;

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
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



    public String getAspectRatio() {
        return aspectRatio;
    }

    public void setAspectRatio(String aspectRatio) {
        this.aspectRatio = aspectRatio;
    }

    public void setCfgScale(int cfgScale) {
        this.cfgScale = cfgScale;
    }

    public void setSeed(int seed) {
        this.seed = seed;
    }

    public int getSteps() {
        return steps;
    }

    public void setSteps(int steps) {
        this.steps = steps;
    }

    public int getSeed() {
        return seed;
    }
}
