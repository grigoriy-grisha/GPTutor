package com.chatgpt.services;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.entity.AttemptsResponse;
import com.chatgpt.entity.VkUser;
import com.chatgpt.repositories.VkUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AttemptsService {
    @Autowired
    UserService userService;

    @Autowired
    VkUsersRepository vkUsersRepository;

    public VkUser freeUpdateAttempts(String vkId) {
        var user = userService.getOrCreateVkUser(vkId);

        var attempts = user.getFreeAttempts();
        if (attempts == 0) {
            throw new BadRequestException("Закончились попытки");
        }

        user.setRequests(user.getRequests() + 10);
        user.setFreeAttempts(user.getFreeAttempts() - 1);

        vkUsersRepository.save(user);

        return user;
    }

    @Transactional
    public void refreshAttempts() {
        vkUsersRepository.refreshFreeAttempts();
    }

    public AttemptsResponse getAttempts(String vkId) {
        var user = userService.getOrCreateVkUser(vkId);

        return new AttemptsResponse(user.getRequests(), user.getFreeAttempts());
    }

    public void incrementAttempts(String vkId, int count) {
        var user = userService.getOrCreateVkUser(vkId);

        var requests = user.getRequests() - count;

        user.setRequests(Math.max(requests, 0));

        vkUsersRepository.save(user);
    }

    public boolean hasRequests(String vkId) {
        var user = userService.getOrCreateVkUser(vkId);
        return user.getRequests() <= 0;
    }


    void updateAttemptsUser(String vkId, int count) {
        var user = userService.getOrCreateVkUser(vkId);

        var requests = user.getRequests() + count;

        user.setRequests(requests);

        vkUsersRepository.save(user);

    }
}
