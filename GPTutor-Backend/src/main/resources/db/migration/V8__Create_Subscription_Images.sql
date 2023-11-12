CREATE TABLE subscription_images
(
    id              UUID NOT NULL,
    vk_user_id      UUID NOT NULL,
    is_active       BOOLEAN,
    last_updated    TIMESTAMP,
    subscription_id VARCHAR,
    PRIMARY KEY (id)
);