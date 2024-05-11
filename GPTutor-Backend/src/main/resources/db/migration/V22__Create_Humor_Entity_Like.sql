CREATE TABLE humor_entity_like
(
    id UUID NOT NULL,
    humor_entity_id UUID NOT NULL,
    vk_user_id UUID NOT NULL,
    PRIMARY KEY (id)
);