package com.chatgpt.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ConversationMessage {

    @JsonProperty("content")
    private String content;

    @JsonProperty("role")
    private String role;
}
