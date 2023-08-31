package com.chatgpt.entity;

public class ApiKey {
    boolean isBlocked;
    String key;

    int attempts;

    private final int initAttempts;

    public ApiKey(String key, int attempts) {
        this.initAttempts = attempts;
        this.attempts = attempts;
        this.key = key;
    }

    public boolean isBlocked() {
        return isBlocked;
    }

    public void setBlocked(boolean blocked) {
        isBlocked = blocked;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public int getAttempts() {
        return attempts;
    }

    public void incrementAttempts() {
        if (this.attempts == this.initAttempts) return;
        this.attempts++;
    }

    public void decrementAttempts() {
        if (this.attempts == 0) return;
        this.attempts--;
    }

    public void resetAttempts() {
        this.attempts = initAttempts;
    }
}
