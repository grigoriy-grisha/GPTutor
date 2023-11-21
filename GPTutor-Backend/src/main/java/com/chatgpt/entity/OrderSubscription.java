package com.chatgpt.entity;

public class OrderSubscription {
    public long create_time;

    public boolean pending_cancel;

    public long id;
    public String item_id;
    public int period;
    public long period_start_time;
    public double price;
    public String status;
    public long update_time;
    public long next_bill_time;
    public long expire_time;
    public String title;
    public long app_id;
    public String application_name;
    public String photo_url;
    public boolean test_mode;
    public boolean is_game;

    public String cancel_reason;

    public long getCreate_time() {
        return create_time;
    }

    public void setCreate_time(long create_time) {
        this.create_time = create_time;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getItem_id() {
        return item_id;
    }

    public void setItem_id(String item_id) {
        this.item_id = item_id;
    }

    public int getPeriod() {
        return period;
    }

    public void setPeriod(int period) {
        this.period = period;
    }

    public long getPeriod_start_time() {
        return period_start_time;
    }

    public void setPeriod_start_time(long period_start_time) {
        this.period_start_time = period_start_time;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(long update_time) {
        this.update_time = update_time;
    }

    public long getNext_bill_time() {
        return next_bill_time;
    }

    public void setNext_bill_time(long next_bill_time) {
        this.next_bill_time = next_bill_time;
    }

    public long getExpire_time() {
        return expire_time;
    }

    public void setExpire_time(long expire_time) {
        this.expire_time = expire_time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getApp_id() {
        return app_id;
    }

    public void setApp_id(long app_id) {
        this.app_id = app_id;
    }

    public String getApplication_name() {
        return application_name;
    }

    public void setApplication_name(String application_name) {
        this.application_name = application_name;
    }

    public String getPhoto_url() {
        return photo_url;
    }

    public void setPhoto_url(String photo_url) {
        this.photo_url = photo_url;
    }

    public boolean isTest_mode() {
        return test_mode;
    }

    public void setTest_mode(boolean test_mode) {
        this.test_mode = test_mode;
    }

    public boolean isIs_game() {
        return is_game;
    }

    public void setIs_game(boolean is_game) {
        this.is_game = is_game;
    }

    public String getCancel_reason() {
        return cancel_reason;
    }

    public void setCancel_reason(String cancel_reason) {
        this.cancel_reason = cancel_reason;
    }

    public boolean isPending_cancel() {
        return pending_cancel;
    }

    public void setPending_cancel(boolean pending_cancel) {
        this.pending_cancel = pending_cancel;
    }
}

