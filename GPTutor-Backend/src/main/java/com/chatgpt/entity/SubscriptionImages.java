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

    Instant lastUpdated;

    String subscriptionId;

    Instant expire;

    public SubscriptionImages(
            VkUser vkUser,
            boolean isActive,
            Instant lastUpdated,
            String subscriptionId,
            Instant expire
    ) {
        this.vkUser = vkUser;
        this.isActive = isActive;
        this.lastUpdated = lastUpdated;
        this.subscriptionId = subscriptionId;
        this.expire = expire;

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

    public Instant  getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Instant  lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
    }

    public Instant getExpire() {
        return expire;
    }

    public void setExpire(Instant expire) {
        this.expire = expire;
    }
}
