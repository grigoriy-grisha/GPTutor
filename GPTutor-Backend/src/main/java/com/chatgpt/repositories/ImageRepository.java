package com.chatgpt.repositories;

import com.chatgpt.entity.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ImageRepository extends CrudRepository<Image, UUID> {
    Image findByObjectId(String objectId);
    Page<Image> findAllByVkUserId(UUID vkId, PageRequest pageable);
}
