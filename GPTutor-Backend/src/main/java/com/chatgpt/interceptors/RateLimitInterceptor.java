package com.chatgpt.interceptors;

import com.chatgpt.Exceptions.TooManyRequestsExceptions;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;


@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private final Map<String, Map<String, Bucket>> urlBuckets = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) throws Exception {
        String uri = request.getRequestURI();
        String userId = (String) request.getAttribute("vkUserId");

        if (userId != null) {
            Bucket bucket = getBucket(request, userId, uri);
            if (bucket.tryConsume(1)) {
                return true;
            } else {
                throw new TooManyRequestsExceptions("Превышено количество запросов в минуту, попробуйте позже");
            }
        }


        return true;
    }

    private synchronized Bucket getBucket(HttpServletRequest request, String userId, String uri) {
        Map<String, Bucket> userSpecificBuckets = urlBuckets.computeIfAbsent(userId, k -> new ConcurrentHashMap<>());
        return userSpecificBuckets.computeIfAbsent(uri, k -> Bucket.builder()
                .addLimit(limit -> limit.capacity(getCapacityForRequest(request)).refillGreedy(getCapacityForRequest(request), Duration.ofMinutes(1)))
                .build());
    }

    private int getCapacityForRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();

        if (uri.startsWith("/image") && Objects.equals(request.getMethod(), "POST")) {
            return 10;
        }

        if (uri.startsWith("/conversation")) {
            return 6;
        }

        if (uri.startsWith("/vk-doc/conversation")) {
            return 3;
        }

        if (uri.startsWith("/vk")) {
            return 3;
        }

        return 100;
    }
}