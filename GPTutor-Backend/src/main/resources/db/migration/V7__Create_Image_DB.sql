CREATE TABLE image
(
    id                  UUID      NOT NULL,
    vk_user_id          UUID      NOT NULL,
    created_at          TIMESTAMP NOT NULL,
    prompt              VARCHAR   NOT NULL,
    model_id            VARCHAR   NOT NULL,
    scheduler           VARCHAR   NOT NULL,
    negative_prompt     VARCHAR   NOT NULL,
    guidance_scale      INT       NOT NULL,
    seed                VARCHAR   NOT NULL,
    num_inference_steps INT       NOT NULL,
    width               INT       NOT NULL,
    height              INT       NOT NULL,
    url                 VARCHAR   NOT NULL,
    upscale             VARCHAR   NOT NULL,
    expire              TIMESTAMP,
    PRIMARY KEY (id)
);