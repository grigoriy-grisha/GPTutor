package com.chatgpt.services;

import com.chatgpt.Exceptions.BadRequestException;
import com.chatgpt.Exceptions.NotAFoundException;
import com.chatgpt.entity.ImageComplaint;
import com.chatgpt.repositories.ImageComplaintRepository;
import com.chatgpt.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.UUID;

@Service
public class ComplaintsService {
    @Autowired
    ImageComplaintRepository imageComplaintRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    ImagesService imagesService;

    @Autowired
    UserService userService;

    public ImageComplaint createComplaint(UUID imageId, String userId) {
        var image = imagesService.getImageById(imageId);
        var user  = userService.getOrCreateVkUser(userId);

        if (image.isEmpty()) {
            throw new NotAFoundException("Изображение не найдено");
        }

        var complaint = imageComplaintRepository.findByUserIdAndImageId(user.getId(), imageId);

        if (complaint.isPresent()) {
            throw new BadRequestException("Репорт уже есть");
        }

        var imageComplaint = new ImageComplaint();
        imageComplaint.setImage(image.get());
        imageComplaint.setVkUser(user);
        imageComplaint.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        imageComplaintRepository.save(imageComplaint);

        if (image.get().getComplaints().size() >= 2) {
            image.get().setPublishing(false);
            imageRepository.save(image.get());
        }

        return imageComplaint;
    }
}
