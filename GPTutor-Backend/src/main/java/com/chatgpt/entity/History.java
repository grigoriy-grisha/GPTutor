package com.chatgpt.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    public VkUser getVkUser() {
        return vkUser;
    }

    @ManyToOne()
    private VkUser vkUser;

    private String lastMessage;

    private String type;

    private String systemMessage;

    private String lessonName;

    private Timestamp lastUpdated;

    public History() {}

    public History(VkUser vkUser, String lastMessage, String type, String systemMessage, String lessonName,  Timestamp lastUpdated) {
        this.vkUser = vkUser;
        this.lastMessage = lastMessage;
        this.type = type;
        this.systemMessage = systemMessage;
        this.lessonName = lessonName;
        this.lastUpdated = lastUpdated;
    }

    public void setVkUser(VkUser vkUser) {
        this.vkUser = vkUser;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSystemMessage() {
        return systemMessage;
    }

    public void setSystemMessage(String systemMessage) {
        this.systemMessage = systemMessage;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getLessonName() {
        return lessonName;
    }

    public void setLessonName(String lessonName) {
        this.lessonName = lessonName;
    }

    public Timestamp getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Timestamp lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
