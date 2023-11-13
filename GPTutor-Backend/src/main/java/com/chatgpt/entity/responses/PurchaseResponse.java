package com.chatgpt.entity.responses;

public class PurchaseResponse<T> {
    T response;

    public PurchaseResponse(T response) {
        this.response = response;
    }

    public T getResponse() {
        return response;
    }

    public void setResponse(T response) {
        this.response = response;
    }
}