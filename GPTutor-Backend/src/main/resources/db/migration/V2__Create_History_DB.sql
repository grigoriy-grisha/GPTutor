CREATE TABLE history
(
    id             UUID NOT NULL,
    vk_user_id     UUID NOT NULL,
    last_message   VARCHAR,
    type           VARCHAR,
    lesson_name    VARCHAR,
    system_message VARCHAR,
    PRIMARY KEY (id)
);