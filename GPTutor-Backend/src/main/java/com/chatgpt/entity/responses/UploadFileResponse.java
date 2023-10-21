package com.chatgpt.entity.responses;


public class UploadFileResponse {
    private int server;

    private String photo;

    private String hash;

    public int getServer() {
        return server;
    }

    public void setServer(int server) {
        this.server = server;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }
}