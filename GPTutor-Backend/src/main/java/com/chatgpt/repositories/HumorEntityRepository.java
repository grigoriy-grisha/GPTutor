package com.chatgpt.repositories;

import com.chatgpt.entity.HumorEntity;
import com.chatgpt.entity.HumorType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface HumorEntityRepository extends CrudRepository<HumorEntity, UUID> {

    Page<HumorEntity> findByTypeIn(List<HumorType> types, PageRequest pageable);

    @Query("SELECT humor FROM HumorEntity humor LEFT JOIN HumorEntityLike like ON humor.id = like.humorEntity.id GROUP BY humor.id ORDER BY COUNT(like.id) DESC")
    Page<HumorEntity> findAllOrderByLikesDesc(Pageable pageable);
}
