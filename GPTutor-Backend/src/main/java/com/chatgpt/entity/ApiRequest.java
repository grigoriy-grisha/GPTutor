package com.chatgpt.entity;

import java.util.Date;

public class ApiRequest {
    String type;

    Date date;

    int status;

    public ApiRequest(String type, int status) {
        this.status = status;
        this.type = type;
        this.date = new Date();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
