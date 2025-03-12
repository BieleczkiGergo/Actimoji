-- Alapadatok beszúrása
INSERT INTO word (word, banned_icons) VALUES ('exampleWord1', 'icon1, icon2');
INSERT INTO word (word, banned_icons) VALUES ('exampleWord2', 'icon3, icon4');

-- Javaslat beszúrása
INSERT INTO suggestion (is_moderated, word_id, banned_emojis) VALUES (0, 1, 'emoji1, emoji2');

-- Moderátor kérés példája
INSERT INTO moderator_request (approved, approved_id, requested_id, reason)
VALUES (1, 1001, 2001, 'Request reason example');
