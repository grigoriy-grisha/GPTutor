ALTER TABLE vk_user ADD COLUMN requests INTEGER DEFAULT 10;
ALTER TABLE vk_user ADD COLUMN free_attempts INTEGER DEFAULT 10;