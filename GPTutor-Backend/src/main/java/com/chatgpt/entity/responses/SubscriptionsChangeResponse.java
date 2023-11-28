package com.chatgpt.entity.responses;

public class SubscriptionsChangeResponse {
    int subscription_id;

    public SubscriptionsChangeResponse(int subscription_id) {
        this.subscription_id = subscription_id;
    }

    public int getSubscription_id() {
        return subscription_id;
    }

    public void setSubscription_id(int subscription_id) {
        this.subscription_id = subscription_id;
    }
}
