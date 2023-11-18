package com.chatgpt.interceptors;

import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private final Map<String, Map<String, Bucket>> urlBuckets = new ConcurrentHashMap<>();
    private final Map<String, Instant> userLastRequestTime = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) throws Exception {
        String uri = request.getRequestURI();
        String userId = (String) request.getAttribute("vkUserId");

        System.out.println(userId);

        if (userId != null) {
            Bucket bucket = getBucket(userId, uri);
            if (bucket.tryConsume(1)) {
                return true;
            } else {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.getWriter().write("Rate limit exceeded");
                return false;
            }
        }



        return true;
    }

    private synchronized Bucket getBucket(String userId, String uri) {
        Map<String, Bucket> userSpecificBuckets = urlBuckets.computeIfAbsent(userId, k -> new ConcurrentHashMap<>());
        return userSpecificBuckets.computeIfAbsent(uri, k -> Bucket.builder()
                .addLimit(limit -> limit.capacity(getCapacityForUrl(uri)).refillGreedy(getCapacityForUrl(uri), Duration.ofMinutes(1)))
                .build());
    }

    private int getCapacityForUrl(String uri) {

        if (uri.startsWith("/image")) {
            return 10;
        }

        if (uri.startsWith("/history")) {
            return 30;
        }

        return 10;
    }
}