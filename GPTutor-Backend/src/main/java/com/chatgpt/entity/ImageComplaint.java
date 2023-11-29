package com.chatgpt.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
public class ImageComplaint {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @ManyToOne()
    private VkUser vkUser;

    @ManyToOne()
    @JsonBackReference
    private Image image;

    private Timestamp createdAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public VkUser getVkUser() {
        return vkUser;
    }

    public void setVkUser(VkUser vkUser) {
        this.vkUser = vkUser;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}