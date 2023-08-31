package com.chatgpt.interceptors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class CorsInterceptor implements HandlerInterceptor {
    private static final String ALLOWED_METHODS = "GET, POST, PUT, DELETE";
    private static final String ALLOWED_HEADERS = "*";

    @Value("${cors.allowed.origins}")
    String allowOrigins;

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, HttpServletResponse response, @NonNull Object handler) {
        response.setHeader("Access-Control-Allow-Origin", allowOrigins);
        response.setHeader("Access-Control-Allow-Methods", ALLOWED_METHODS);
        response.setHeader("Access-Control-Allow-Headers", ALLOWED_HEADERS);

        return true;
    }

    @Override
    public void postHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler, ModelAndView modelAndView) {
        // Do nothing
    }

    @Override
    public void afterCompletion(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler, Exception ex) {
        // Do nothing
    }
}
