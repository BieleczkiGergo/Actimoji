-- Inserting data into account table
INSERT INTO `account` (user_name, password, email_address, is_moderator)
VALUES
    ('admin', 'admin123', 'admin@example.com', TRUE),
    ('john_doe', 'password123', 'john.doe@example.com', FALSE),
    ('jane_smith', 'password456', 'jane.smith@example.com', FALSE);

-- Inserting data into word table (must be done before suggestion)
