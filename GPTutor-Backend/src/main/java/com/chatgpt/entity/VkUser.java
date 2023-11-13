package com.chatgpt.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class VkUser {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String vkId;

    private int requests;

    public VkUser() {
    }
    public VkUser(String vkId) {
        this.vkId = vkId;
        this.requests = 10;
    }
    public void setVkId(String vkId) {
        this.vkId = vkId;
    }
    public String getVkId() {
        return vkId;
    }
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public int getRequests() {
        return requests;
    }

    public void setRequests(int requests) {
        this.requests = requests;
    }
}
