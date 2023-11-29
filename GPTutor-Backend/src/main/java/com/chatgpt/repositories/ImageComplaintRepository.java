package com.chatgpt.repositories;

import com.chatgpt.entity.ImageComplaint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ImageComplaintRepository extends CrudRepository<ImageComplaint, UUID> {
    @Query("SELECT i FROM ImageComplaint i WHERE i.vkUser.id = :userId AND i.image.id = :imageId")
    Optional<ImageComplaint> findByUserIdAndImageId(@Param("userId") UUID userId, @Param("imageId") UUID imageId);
}
