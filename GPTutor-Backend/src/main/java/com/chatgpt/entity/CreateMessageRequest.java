package com.chatgpt.entity;

import java.sql.Timestamp;
import java.util.UUID;

public class CreateMessageRequest {
    private UUID historyId;
    private String content;
    private String role;
    private boolean isError;
    private boolean inLocal;
    private boolean isFailedModeration;

    private Timestamp lastUpdated;

    public UUID getHistoryId() {
        return historyId;
    }

    public void setHistoryId(UUID historyId) {
        this.historyId = historyId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isError() {
        return isError;
    }

    public void setError(boolean error) {
        isError = error;
    }

    public boolean isFailedModeration() {
        return isFailedModeration;
    }

    public void setFailedModeration(boolean failedModeration) {
        isFailedModeration = failedModeration;
    }

    public Timestamp getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Timestamp lastUpdated) {
        this.lastUpdated = lastUpdated;
    }


    public void setInLocal(boolean inLocal) {
        this.inLocal = inLocal;
    }

    public boolean isInLocal() {
        return inLocal;
    }
}
