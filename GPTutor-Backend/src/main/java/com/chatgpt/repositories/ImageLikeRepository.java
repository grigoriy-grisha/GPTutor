package com.chatgpt.repositories;

import com.chatgpt.entity.ImageLike;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ImageLikeRepository extends CrudRepository<ImageLike, UUID> {}
