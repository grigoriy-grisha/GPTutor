package com.chatgpt;

import com.chatgpt.interceptors.AuthorizationInterceptor;
import com.chatgpt.interceptors.CorsInterceptor;
import com.chatgpt.interceptors.DurationLimitInterceptor;
import com.chatgpt.interceptors.RateLimitInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
        configurer.setDefaultTimeout(65000);
    }

    @Autowired
    private AuthorizationInterceptor authorizationInterceptor;

    @Autowired
    private CorsInterceptor corsInterceptor;

    @Autowired RateLimitInterceptor rateLimitInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(corsInterceptor);
        registry.addInterceptor(authorizationInterceptor);
        registry.addInterceptor(rateLimitInterceptor);


        DurationLimitInterceptor durationLimitInterceptor = new DurationLimitInterceptor();
        durationLimitInterceptor.addRateLimitForUrl("/images", 1, 5);

        registry.addInterceptor(durationLimitInterceptor);
    }
}



