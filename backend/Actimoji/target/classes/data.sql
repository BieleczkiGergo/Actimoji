-- Inserting data into account table
INSERT INTO `account` (id, user_name, password, email_address, is_moderator)
VALUES
    (1, 'admin', 'admin123', 'admin@example.com', TRUE),
    (2, 'john_doe', 'password123', 'john.doe@example.com', FALSE),
    (3, 'Gipszkarton Emil', 'skibidicigany', 'emil@gipszkarton.me', FALSE),
    (4, 'jane_smith', 'password456', 'jane.smith@example.com', FALSE);

-- Inserting data into word table (must be done before suggestion)
INSERT INTO `word` (id, word, banned_icons)
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

INSERT INTO `modrequest` (requested_id, approved_id, reason, approved)
VALUES
    (3, NULL, 'According to all known laws of aviation, there is no way a bee should be able to fly', FALSE);

INSERT INTO `suggestion` (operation, word_id, new_word, new_icons, reason, poster, handler_mod, handled_at, accepted)
VALUES
    (0, NULL, 'Oh Long Johnson', '',
        'Ill give you a nickel if you tickle my pickle', 3, NULL, NULL, NULL)
    ,(1, 21, 'helicopter', '🚁', 'Why not', 1, NULL, NULL, NULL)
    ,(2, 23, '', '', '', 2, NULL, NULL, NULL)
    ,(1, 8, 'idgaf', '',
        'ön egy cégnél dolgozik', 4, NULL, NULL, NULL)
    ;

