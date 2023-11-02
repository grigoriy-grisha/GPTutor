package com.chatgpt;


import com.chatgpt.repositories.VkUsersRepository;
import com.chatgpt.services.AttemptsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class Scheduler {

    @Autowired
    AttemptsService attemptsService;

    @Scheduled(cron = "0 0 * * * *")
    public void myMethod() {
        System.out.println("hello");
        attemptsService.refreshAttempts();
    }
}