package com.chatgpt.repositories;

import com.chatgpt.entity.VkUser;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface VkUsersRepository extends CrudRepository<VkUser, UUID> {
    VkUser findByVkId(String vkId);
}
