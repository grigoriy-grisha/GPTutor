CREATE TABLE message
(
    id                   UUID NOT NULL,
    history_id           UUID NOT NULL,
    content              VARCHAR,
    role                 VARCHAR(16),
    is_error             BOOLEAN,
    is_failed_moderation BOOLEAN,
    PRIMARY KEY (id)
);