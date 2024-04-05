package com.chatgpt.interceptors;

import com.chatgpt.services.AuthCheckerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
public class AuthorizationInterceptor implements HandlerInterceptor {
    @Autowired
    AuthCheckerService authCheckerService;

    @Value("${auth.skip}")
    boolean skipAuth;

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) throws Exception {
        if (Objects.equals(request.getMethod(), "OPTIONS")) {
            return true;
        }

        String url = request.getRequestURI();

        if (Objects.equals(url, "/purchase")) {
            return true;
        }


        if (skipAuth) {
            var authorization = authCheckerService.splitBearer(request.getHeader("Authorization"));

            var userId = authCheckerService.getVkUserId(authorization);

            request.setAttribute("vkUserId", Objects.requireNonNullElse(userId, "0"));
            request.setAttribute("vkAppId", authCheckerService.getVkAppId(authorization));

            return true;
        }

        if (authCheckerService.isUrlCheck(url)) {
            boolean isSignSuccess = authCheckerService.checkAuthorizationHeader(url);

            if (isSignSuccess) {
                request.setAttribute(
                        "vkUserId",
                        authCheckerService.getVkUserId(url)
                );

                request.setAttribute(
                        "vkAppId",
                        authCheckerService.getVkAppId(url)
                );

                return true;
            }

        }

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null) {
            var authorization = authCheckerService.splitBearer(authorizationHeader);

            boolean isSignSuccess = authCheckerService.checkAuthorizationHeader(authorization);

            if (isSignSuccess) {
                request.setAttribute(
                        "vkUserId",
                        authCheckerService.getVkUserId(authorization)
                );

                request.setAttribute(
                        "vkAppId",
                        authCheckerService.getVkAppId(authorization)
                );

                return true;
            }
        }

        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        return false;
    }
}
