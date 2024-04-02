package com.chatgpt.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
public class SubscriptionImages {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @ManyToOne()
    private VkUser vkUser;

    boolean isActive;


    String subscriptionId;

    int expire;

    String name;

    public SubscriptionImages(
            VkUser vkUser,
            String name,
            boolean isActive,
            String subscriptionId,
            int expire
    ) {
        this.vkUser = vkUser;
        this.isActive = isActive;
        this.subscriptionId = subscriptionId;
        this.expire = expire;
        this.name = name;

    }

    public SubscriptionImages() {

    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public VkUser getVkUser() {
        return vkUser;
    }

    public void setVkUser(VkUser vkUser) {
        this.vkUser = vkUser;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }


    public String getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
    }

    public int getExpire() {
        return expire;
    }

    public void setExpire(int expire) {
        this.expire = expire;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
