package com.chatgpt.entity.responses;


import com.chatgpt.entity.OrderSubscription;

public class OrderSubscriptionResponse {
    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }

    public static class Response {
        public int count;
        public OrderSubscription[] items;

        public int getCount() {
            return count;
        }

        public void setCount(int count) {
            this.count = count;
        }

        public OrderSubscription[] getItems() {
            return items;
        }

        public void setItems(OrderSubscription[] items) {
            this.items = items;
        }
    }

    public Response response;
}
