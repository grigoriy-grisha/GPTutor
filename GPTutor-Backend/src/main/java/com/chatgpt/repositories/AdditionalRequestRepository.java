package com.chatgpt.repositories;

import com.chatgpt.entity.database.AdditionalRequests;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface AdditionalRequestRepository extends CrudRepository<AdditionalRequests, UUID> {
    List<AdditionalRequests> findAllByVkUserId(UUID vkId);
}
