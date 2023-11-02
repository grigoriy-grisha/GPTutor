package com.chatgpt.entity;

import org.springframework.beans.factory.annotation.Value;

public class PurchaseItem {
    String title;
    int price;

    public PurchaseItem(String title, int price) {
        this.title = title;
        this.price = price;

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
