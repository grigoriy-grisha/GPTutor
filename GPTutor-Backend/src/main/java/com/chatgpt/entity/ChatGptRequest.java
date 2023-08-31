package com.chatgpt.entity;

public record ChatGptRequest(String model, ConversationMessage[] messages, boolean stream) {
}
