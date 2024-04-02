package com.chatgpt.repositories;

import com.chatgpt.entity.SubscriptionImages;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface SubscriptionsImagesRepository extends CrudRepository<SubscriptionImages, UUID> {
    SubscriptionImages findByVkUserIdAndName(UUID vkUser_id, String name);
}
