package com.chatgpt.services;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.nio.charset.StandardCharsets;

public final class Utf8SseEmitter extends SseEmitter {

    private static final MediaType UTF8_TEXT_STREAM = new MediaType("text", "event-stream", StandardCharsets.UTF_8);

    @Override
    protected void extendResponse(ServerHttpResponse outputMessage) {
        HttpHeaders headers = outputMessage.getHeaders();
        if (headers.getContentType() == null) {
            headers.setContentType(UTF8_TEXT_STREAM);
        }
    }

}