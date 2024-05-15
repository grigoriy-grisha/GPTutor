package com.chatgpt.entity.responses;

import java.util.List;

public class SaveWallPhotoResponse {
    private List<PhotoData> response;

    public List<PhotoData> getResponse() {
        return response;
    }

    public void setResponse(List<PhotoData> response) {
        this.response = response;
    }

    public static class PhotoData {
        private int album_id;
        private long date;
        private long id;
        private long owner_id;
        private String access_key;
        private List<Size> sizes;
        private String text;
        private boolean has_tags;

        public int getAlbum_id() {
            return album_id;
        }

        public void setAlbum_id(int album_id) {
            this.album_id = album_id;
        }

        public long getDate() {
            return date;
        }

        public void setDate(long date) {
            this.date = date;
        }

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public long getOwner_id() {
            return owner_id;
        }

        public void setOwner_id(long owner_id) {
            this.owner_id = owner_id;
        }

        public String getAccess_key() {
            return access_key;
        }

        public void setAccess_key(String access_key) {
            this.access_key = access_key;
        }

        public List<Size> getSizes() {
            return sizes;
        }

        public void setSizes(List<Size> sizes) {
            this.sizes = sizes;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public boolean isHas_tags() {
            return has_tags;
        }

        public void setHas_tags(boolean has_tags) {
            this.has_tags = has_tags;
        }
    }

    public static class Size {
        private int height;
        private String type;
        private int width;
        private String url;


        public int getHeight() {
            return height;
        }

        public void setHeight(int height) {
            this.height = height;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public int getWidth() {
            return width;
        }

        public void setWidth(int width) {
            this.width = width;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
