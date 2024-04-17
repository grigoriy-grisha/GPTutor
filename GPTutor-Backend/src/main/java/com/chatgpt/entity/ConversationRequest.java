package com.chatgpt.entity;

public class ConversationRequest {

    private String model;
    private ConversationMessage[] messages;
    public ConversationMessage[] getMessages() {
        return messages;
    }

    public void setNumbers(ConversationMessage[] messages) {
        this.messages = messages;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
