package com.chatgpt.services;

import com.chatgpt.entity.VkUser;
import com.chatgpt.repositories.VkUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service()
public class UserService {
    @Value("${auth.skip}")
    boolean skipAuth;

    @Autowired
    VkUsersRepository vkUsersRepository;

    VkUser getOrCreateVkUser(String vkId) {

        var foundFoundUser = vkUsersRepository.findByVkId(vkId);
        if (foundFoundUser != null) return foundFoundUser;

        var vkUser = new VkUser(vkId);
        vkUsersRepository.save(vkUser);

        return vkUser;
    }
}
