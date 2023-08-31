package com.chatgpt.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @ManyToOne()
    private History history;
    private String content;
    private String role;
    private boolean isError;
    private boolean isFailedModeration;

    private Boolean inLocal;

    private Timestamp createdAt;

    public Message() {
    }

    public Message(History history, String content, String role, boolean isError, boolean isFailedModeration, Timestamp createdAt, boolean inLocal) {
        this.history = history;
        this.content = content;
        this.role = role;
        this.isError = isError;
        this.isFailedModeration = isFailedModeration;
        this.createdAt = createdAt;
        this.inLocal = inLocal;
    }

    public History getHistory() {
        return history;
    }

    public void setHistory(History history) {
        this.history = history;
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

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean isInLocal() {
        return inLocal;
    }

    public void setInLocal(Boolean inLocal) {
        this.inLocal = inLocal;
    }
}
