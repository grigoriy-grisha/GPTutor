package com.chatgpt.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
public class HumorEntityLike {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne()
    @JsonBackReference
    private HumorEntity humorEntity;

    @ManyToOne()
    private VkUser vkUser;


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public HumorEntity getHumorEntity() {
        return humorEntity;
    }

    public void setHumorEntity(HumorEntity humorEntity) {
        this.humorEntity = humorEntity;
    }

    public VkUser getVkUser() {
        return vkUser;
    }

    public void setVkUser(VkUser vkUser) {
        this.vkUser = vkUser;
    }
}