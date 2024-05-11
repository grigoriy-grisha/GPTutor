package com.chatgpt.entity.responses;

public class CommonResponse<T> {
    T response;

    public T getResponse() {
        return response;
    }

    public void setResponse(T response) {
        this.response = response;
    }
}
