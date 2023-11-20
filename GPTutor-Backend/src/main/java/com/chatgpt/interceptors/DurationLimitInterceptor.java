package com.chatgpt.interceptors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class DurationLimitInterceptor  implements HandlerInterceptor  {

    private final Map<String, Map<String, Instant>> userLastRequestTime = new ConcurrentHashMap<>();
    private final Map<String, Map<String, Integer>> urlToRateAndDuration = new HashMap<>();

    public void addRateLimitForUrl(String url, int requestsPerDuration, int durationInSeconds) {
        Map<String, Integer> rateAndDuration = new HashMap<>();
        rateAndDuration.put("requests", requestsPerDuration);
        rateAndDuration.put("duration", durationInSeconds);
        urlToRateAndDuration.put(url, rateAndDuration);
    }

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String userId = (String) request.getAttribute("vkUserId");
        String requestUrl = request.getRequestURI();
        String method = request.getMethod();

        var key = requestUrl + " | " + method;

        if (userId != null && urlToRateAndDuration.containsKey(key)) {
            Map<String, Integer> rateAndDuration = urlToRateAndDuration.get(key);
            int requestsPerDuration = rateAndDuration.get("requests");
            int durationInSeconds = rateAndDuration.get("duration");

            if (!userLastRequestTime.containsKey(userId)) {
                userLastRequestTime.put(userId, new ConcurrentHashMap<>());
            }

            Map<String, Instant> urlLastRequestTime = userLastRequestTime.get(userId);

            if (urlLastRequestTime.containsKey(requestUrl)) {
                Instant lastRequestTime = urlLastRequestTime.get(requestUrl);
                Instant now = Instant.now();
                Duration timeSinceLastRequest = Duration.between(lastRequestTime, now);
                if (timeSinceLastRequest.getSeconds() < durationInSeconds) {
                    if (urlLastRequestTime.size() >= requestsPerDuration) {
                        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                        response.getWriter().write("Rate limit exceeded");
                        return false;
                    }
                }
            }
            urlLastRequestTime.put(requestUrl, Instant.now());
        }

        return true;
    }

}
