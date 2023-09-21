CREATE TABLE image
(
    id              UUID      NOT NULL,
    vk_user_id      UUID      NOT NULL,
    created_at      TIMESTAMP NOT NULL,
    prompt          VARCHAR   NOT NULL,
    model           VARCHAR   NOT NULL,
    sampler         VARCHAR   NOT NULL,
    negative_prompt VARCHAR   NOT NULL,
    aspect_ratio    VARCHAR   NOT NULL,
    cfg_scale       INT       NOT NULL,
    seed            INT       NOT NULL,
    steps           INT       NOT NULL,
    url             VARCHAR   NOT NULL,
    expire          TIMESTAMP,
    PRIMARY KEY (id)
);