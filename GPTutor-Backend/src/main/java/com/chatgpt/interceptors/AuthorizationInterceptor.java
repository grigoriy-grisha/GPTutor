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

import java.net.MalformedURLException;
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

        String authorizationHeader = request.getHeader("Authorization");
        System.out.println(authorizationHeader);
        if (authorizationHeader != null) {

            if (authorizationHeader.startsWith("Bearer")) {
                var authorization = authCheckerService.splitBearer(authorizationHeader);

                boolean isSignSuccess = authCheckerService.checkAuthorizationHeader(authorization);

                if (isSignSuccess) {
                   request.setAttribute("isTG", false);

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
            } else if (authorizationHeader.startsWith("tma")) {
                var authorization = authCheckerService.splitTMA(authorizationHeader);
                System.out.println(authorization);

                boolean isSignSuccess = authCheckerService.tgAuthCheck(authorization);
                System.out.println(isSignSuccess);

                if (isSignSuccess) {
                    request.setAttribute(
                            "vkUserId",
                            "tg" + authCheckerService.getUserIdFromUrl(authorization)
                    );

                    request.setAttribute("vkAppId",   "tg"   );
                    request.setAttribute("isTG", true);

                    return true;
                }
            }
        }

        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        return false;
    }


}
