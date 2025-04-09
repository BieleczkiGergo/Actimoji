-- Inserting data into account table
INSERT IGNORE INTO `account` (id, user_name, password, email_address, is_moderator)
VALUES
(1, 'admin', 'admin', 'admin@example.com', TRUE);

-- Inserting data into word table (must be done before suggestion)
INSERT IGNORE INTO `word` (id, word, banned_icons)
VALUES
    (1, 'car', '🚗'),
    (2, 'Elon Musk', ''),
    (3, 'engineer', ''),
    (4, 'melon', '🍉🍈'),
    (5, 'lemon', '🍋'),
    (6, 'horny', ''),
    (7, 'meme', ''),
    (8, 'skibidi toilet', ''),
    (9, 'puzzle', '🧩'),
    (10, 'action', ''),
    (11, 'dictator', ''),
    (12, 'John Wick', ''),
    (13, 'solar system', ''),
    (14, 'solar power', ''),
    (15, 'sneeze', ''),
    (16, 'galaxy', ''),
    (17, 'tired', '😫'),
    (18, 'fight', ''),
    (19, 'blind', '🧑‍🦯👩‍🦯👨‍🦯🦯'),
    (20, 'goat', '🐐'),
    (21, 'helicopter', ''),
    (22, 'apple', '🍏🍎'),
    (23, 'murder', '');



