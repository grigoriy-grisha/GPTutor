CREATE TABLE additional_request
(
    id              UUID NOT NULL,
    vk_user_id      UUID NOT NULL,
    is_active       BOOLEAN,
    title           VARCHAR,
    message         VARCHAR,
    PRIMARY KEY (id)
);