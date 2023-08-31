package com.chatgpt;

import com.chatgpt.interceptors.WebSocketInterceptor;
import com.chatgpt.websockets.OnlineWebsocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    OnlineWebsocketHandler onlineWebsocketHandle;

    @Autowired
    WebSocketInterceptor webSocketInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(onlineWebsocketHandle, "/online")
                .setAllowedOrigins("*")
                .addInterceptors(webSocketInterceptor);
    }
}