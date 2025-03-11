CREATE TABLE IF NOT EXISTS `account`
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL,
    password VARCHAR(25) NOT NULL,
    email_address VARCHAR(40) NOT NULL,
    is_moderator BOOLEAN NOT NULL
    );

CREATE TABLE IF NOT EXISTS `words`
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    word varchar(20) NOT NULL,
    banned_icons varchar(200) NOT NULL
    );

CREATE TABLE IF NOT EXISTS `suggestion`
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type ENUM('add', 'remove', 'modify') NOT NULL,
    word_id int NOT NULL,
    new_word VARCHAR(20) NOT NULL,
    new_icons VARCHAR(40) NOT NULL,
    reason VARCHAR(150) NOT NULL,
    poster int,
    handler_mod int,
    handled_at TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES words(id),
    FOREIGN KEY (poster) REFERENCES account(id),
    FOREIGN KEY (handler_mod) REFERENCES account(id)
    );

CREATE TABLE IF NOT EXISTS `modrequest` (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    reason VARCHAR(100) NOT NULL,
    approved BOOLEAN DEFAULT FALSE,
    requested_id int,
    approved_id int,
    FOREIGN KEY (requested_id) REFERENCES account(id),
    FOREIGN KEY (approved_id) REFERENCES account(id)
    );