package com.chatgpt.entity.responses;

public class SubscriptionsChangeResponse {
    int subscription_id;

    int app_order_id;

    public SubscriptionsChangeResponse(int subscription_id, int app_order_id) {
        this.subscription_id = subscription_id;
        this.app_order_id = app_order_id;
    }

    public int getSubscription_id() {
        return subscription_id;
    }

    public void setSubscription_id(int subscription_id) {
        this.subscription_id = subscription_id;
    }

    public int getApp_order_id() {
        return app_order_id;
    }

    public void setApp_order_id(int app_order_id) {
        this.app_order_id = app_order_id;
    }
}
