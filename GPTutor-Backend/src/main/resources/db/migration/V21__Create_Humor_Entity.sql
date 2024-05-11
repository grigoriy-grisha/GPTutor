CREATE TABLE humor_entity
(
    id         UUID    NOT NULL,
    vk_user_id UUID    NOT NULL,
    content    VARCHAR NOT NULL,
    type       VARCHAR NOT NULL,
    PRIMARY KEY (id)
);