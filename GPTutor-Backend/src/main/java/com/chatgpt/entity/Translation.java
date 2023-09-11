package com.chatgpt.entity;

public class Translation {
    String q = "";
    String source=  "auto";
    String target = "en";
    String format = "text";
    String api_key = "";

    public Translation(String q) {
        this.q = q;
    }

    public String getQ() {
        return q;
    }

    public String getSource() {
        return source;
    }

    public String getTarget() {
        return target;
    }

    public String getFormat() {
        return format;
    }

    public String getApi_key() {
        return api_key;
    }
}
