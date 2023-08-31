package com.chatgpt.repositories;

import com.chatgpt.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface HistoryRepository extends CrudRepository<History, UUID> {
    Page<History> findAllByVkUserId(UUID vkId, PageRequest pageable);
    void deleteAllByVkUserId(UUID vkId);
}
