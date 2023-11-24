package com.chatgpt.entity;

public class PurchaseItem {
    String title;
    int price;

    int period;

    public PurchaseItem(String title, int price) {
        this.title = title;
        this.price = price;
        this.period = 30;
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

    public int getPeriod() {
        return period;
    }

    public void setPeriod(int period) {
        this.period = period;
    }
}
