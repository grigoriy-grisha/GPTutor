package com.chatgpt.websockets;


import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashSet;

@Component
public class OnlineWebsocketHandler extends TextWebSocketHandler {

    private final HashSet <String> sessions = new HashSet<>();

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) {
        var vkUserId = session.getAttributes().get("vkUserId");
        sessions.add((String) vkUserId);
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull  CloseStatus status) {
        var vkUserId = session.getAttributes().get("vkUserId");
        sessions.remove((String) vkUserId);
    }

    public HashSet <String> getOnlineUsers() {
        return sessions;
    }
}
