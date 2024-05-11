package com.chatgpt.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.util.List;
import java.util.UUID;
import java.sql.Timestamp;

@Entity
public class HumorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne()
    private VkUser vkUser;


    private String content;

    @Enumerated(EnumType.STRING)
    private HumorType type;

    Timestamp createdAt;


    @OneToMany(mappedBy = "humorEntity", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<HumorEntityLike> humorEntityLikes;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public VkUser getVkUser() {
        return vkUser;
    }

    public void setVkUser(VkUser vkUser) {
        this.vkUser = vkUser;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public HumorType getType() {
        return type;
    }

    public void setType(HumorType type) {
        this.type = type;
    }

    public List<HumorEntityLike> getHumorEntityLikes() {
        return humorEntityLikes;
    }

    public void setHumorEntityLikes(List<HumorEntityLike> humorEntityLikes) {
        this.humorEntityLikes = humorEntityLikes;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}