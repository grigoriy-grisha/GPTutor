CREATE TABLE image
(
    id         UUID      NOT NULL,
    vk_user_id UUID      NOT NULL,
    object_id  VARCHAR   NOT NULL,
    created_at TIMESTAMP NOT NULL,
    prompt     VARCHAR   NOT NULL,
    model      VARCHAR   NOT NULL,
    PRIMARY KEY (id)
);