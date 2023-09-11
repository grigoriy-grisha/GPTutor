package com.chatgpt.entity;

import java.util.List;

public class Translation {
    String model = "gpt-3.5-turbo";
    TranslationMessage[] messages;

    public Translation(TranslationMessage[] messages) {
        this.messages = messages;
    }


    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public TranslationMessage[] getMessages() {
        return messages;
    }

    public void setMessages(TranslationMessage[] messages) {
        this.messages = messages;
    }
}
