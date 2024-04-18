package com.chatgpt.repositories;

import com.chatgpt.entity.database.AdditionalRequest;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface AdditionalRequestRepository extends CrudRepository<AdditionalRequest, UUID> {
    List<AdditionalRequest> findAllByVkUserId(UUID vkId);
}
