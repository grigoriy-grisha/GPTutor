package com.chatgpt.repositories;

import com.chatgpt.entity.Message;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface MessageRepository extends CrudRepository<Message, UUID> {
    Iterable<Message> findAllByHistoryIdOrderByCreatedAtAsc(UUID id);
    List<Message> findByHistoryIdIn(List<UUID> id);
    void deleteAllByHistoryId(UUID id);
}
