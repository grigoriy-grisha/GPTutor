package com.chatgpt.entity;

public class AttemptsResponse {
    int requests;
    int freeAttempts;

    public AttemptsResponse(int requests, int freeAttempts) {
        this.requests = requests;
        this.freeAttempts = freeAttempts;
    }

    public int getRequests() {
        return requests;
    }

    public void setRequests(int requests) {
        this.requests = requests;
    }

    public int getFreeAttempts() {
        return freeAttempts;
    }

    public void setFreeAttempts(int freeAttempts) {
        this.freeAttempts = freeAttempts;
    }
}
