package com.chatgpt.repositories;

import com.chatgpt.entity.SubscriptionsImages;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface SubscriptionsImagesRepository extends CrudRepository<SubscriptionsImages, UUID> {
    SubscriptionsImages findByVkUserId(UUID vkId);
}
