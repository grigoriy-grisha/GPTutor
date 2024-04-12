package com.chatgpt.repositories;

import com.chatgpt.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface HistoryRepository extends CrudRepository<History, UUID> {
    Page<History> findAllByVkUserId(UUID vkId, PageRequest pageable);
    void deleteAllByVkUserId(UUID vkId);


    @Query("SELECT DISTINCT h FROM History h " +
            "INNER JOIN Message m ON h.id = m.history.id " +
            "WHERE h.vkUser.id = :vkId " +
            "AND (LOWER(h.lessonName) LIKE LOWER(concat('%', :substring, '%')) " +
            "OR LOWER(m.content) LIKE LOWER(concat('%', :substring, '%')))")
    Page<History> findByVkUserIdAndByLessonNameOrMessageContentContainingIgnoreCase(@Param("vkId") UUID vkId, @Param("substring") String substring, PageRequest pageable);
}
