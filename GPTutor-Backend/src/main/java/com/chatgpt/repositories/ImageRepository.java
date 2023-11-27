package com.chatgpt.repositories;

import com.chatgpt.entity.Image;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ImageRepository extends CrudRepository<Image, UUID> {


    Page<Image> findAllByVkUserId(UUID vkId, PageRequest pageable);
    Page<Image> findByIsPublishingIsTrue(PageRequest pageable);

    Page<Image> findByPromptContainingAndIsPublishingIsTrueOrOriginalPromptContainingAndIsPublishingIsTrue(String prompt, String originalPrompt, PageRequest pageable);



}
