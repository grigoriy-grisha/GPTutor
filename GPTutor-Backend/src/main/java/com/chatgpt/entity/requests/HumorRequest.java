package com.chatgpt.entity.requests;

import com.chatgpt.entity.HumorType;

public class HumorRequest {
    String content;

    HumorType type;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public HumorType getType() {
        return type;
    }

    public void setType(HumorType type) {
        this.type = type;
    }
}
