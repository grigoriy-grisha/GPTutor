package com.chatgpt.services;

import com.chatgpt.Exceptions.NotAFoundException;
import com.chatgpt.entity.ImageLike;
import com.chatgpt.repositories.ImageLikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.UUID;

@Service
public class ImageLikeService {

    @Autowired
    ImageLikeRepository imageLikeRepository;

    @Autowired
    ImagesService imagesService;

    @Autowired
    UserService userService;

    public ImageLike createImageLike(UUID imageId, String userId) {
        var image = imagesService.getImageById(imageId);
        var user  = userService.getOrCreateVkUser(userId);

        if (image.isEmpty()) {
            throw new NotAFoundException("Изображение не найдено");
        }

        var imageLike = new ImageLike();
        imageLike.setImage(image.get());
        imageLike.setVkUser(user);
        imageLike.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        imageLikeRepository.save(imageLike);

        return imageLike;
    }
}
