package com.chatgpt.entity.requests;

public class QuestionRequest {
    private String question;

    private String source;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}