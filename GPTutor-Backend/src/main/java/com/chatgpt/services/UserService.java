package com.chatgpt.services;

import com.chatgpt.entity.VkUser;
import com.chatgpt.repositories.VkUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service()
public class UserService {
    @Autowired
    VkUsersRepository vkUsersRepository;

    VkUser getOrCreateVkUser(String vkId) {

        var foundFoundUser = vkUsersRepository.findByVkId(vkId);
        if (foundFoundUser != null) return foundFoundUser;

        var vkUser = new VkUser(vkId);
        vkUsersRepository.save(vkUser);

        return vkUser;
    }

    public boolean setUserImageAgreement(String vkId) {
        var foundFoundUser = getOrCreateVkUser(vkId);

        foundFoundUser.setImageAgreement(true);

        vkUsersRepository.save(foundFoundUser);

        return foundFoundUser.isImageAgreement();
    }

    public  boolean getUserImageAgreement(String vkId) {
        var foundFoundUser = getOrCreateVkUser(vkId);

        return foundFoundUser.isImageAgreement();
    }
}
