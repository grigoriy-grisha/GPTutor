package com.chatgpt.entity;

public class ConversationRequest {
    private ConversationMessage[] messages;
    public ConversationMessage[] getMessages() {
        return messages;
    }

    public void setNumbers(ConversationMessage[] messages) {
        this.messages = messages;
    }
}
