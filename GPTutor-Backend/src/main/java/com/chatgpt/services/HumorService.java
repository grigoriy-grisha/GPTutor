package com.chatgpt.services;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.Exceptions.NotAFoundException;
import com.chatgpt.entity.HumorEntity;
import com.chatgpt.entity.HumorEntityLike;
import com.chatgpt.entity.HumorType;
import com.chatgpt.entity.requests.HumorRequest;
import com.chatgpt.repositories.HumorEntityLikeRepository;
import com.chatgpt.repositories.HumorEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class HumorService {
    @Autowired
    UserService userService;

    @Autowired
    HumorEntityRepository humorEntityRepository;

    @Autowired
    HumorEntityLikeRepository humorEntityLikeRepository;

    public HumorEntity createHumorEntity(String vkUserId, HumorRequest humorRequest) {
        var user = userService.getOrCreateVkUser(vkUserId);
        var humorEntity = new HumorEntity();

        humorEntity.setVkUser(user);
        humorEntity.setContent(humorRequest.getContent());
        humorEntity.setType(humorRequest.getType());
        humorEntity.setCreatedAt(Timestamp.from(new Date().toInstant()));

        humorEntityRepository.save(humorEntity);


        return humorEntity;
    }

    public boolean deleteHumorEntityLike(String userId, UUID likeId) {
        var user = userService.getOrCreateVkUser(userId);
        var humorEntityLike = humorEntityLikeRepository.findByUserIdAndId(user.getId(), likeId);

        if (humorEntityLike.isEmpty()) {
            throw new NotAFoundException("Сущность не найдена");
        }

        humorEntityLikeRepository.delete(humorEntityLike.get());

        return true;
    }

    public HumorEntityLike createHumorEntityLike(String userId, UUID humorEntityId) {
        var humorEntity = humorEntityRepository.findById(humorEntityId);
        var user = userService.getOrCreateVkUser(userId);

        if (humorEntity.isEmpty()) {
            throw new NotAFoundException("Сущность не найдена");
        }

        var entity = humorEntityLikeRepository.findByUserIdAndHumorEntityId(user.getId(), humorEntityId);

        if (entity.isPresent()) {
            throw new BadRequestException("Лайк уже проставлен");
        }

        var humorEntityLike = new HumorEntityLike();
        humorEntityLike.setHumorEntity(humorEntity.get());
        humorEntityLike.setVkUser(user);

        humorEntityLikeRepository.save(humorEntityLike);

        return humorEntityLike;
    }

    public Page<HumorEntity> getHumorEntities(List<HumorType> types, int pageNumber, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNumber, pageSize, Sort.by("createdAt").descending());
        return humorEntityRepository.findByTypeIn(types, pageable);
    }

    public Page<HumorEntity> getTopHumorEntities(int pageNumber, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNumber, pageSize);
        return humorEntityRepository.findAllOrderByLikesDesc(pageable);
    }
}
