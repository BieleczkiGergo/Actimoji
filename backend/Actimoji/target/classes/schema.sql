CREATE TABLE IF NOT EXISTS `account`
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email_address VARCHAR(40) NOT NULL,
    is_moderator BOOLEAN NOT NULL
    );

CREATE TABLE IF NOT EXISTS `word`
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    word varchar(20) NOT NULL,
    banned_icons varchar(200) NOT NULL
    );

CREATE TABLE IF NOT EXISTS `suggestion`
(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    operation TINYINT NOT NULL,
    word_id int ,
    new_word VARCHAR(20) ,
    new_icons VARCHAR(40) ,
    reason VARCHAR(150) NOT NULL,
    poster int,
    accepted TINYINT,
    handler_mod int,
    handled_at TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES word(id) ON DELETE CASCADE,
    FOREIGN KEY (poster) REFERENCES account(id) ON DELETE SET NULL,
    FOREIGN KEY (handler_mod) REFERENCES account(id) ON DELETE SET NULL
    );

CREATE TABLE IF NOT EXISTS `modrequest` (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    reason VARCHAR(100) NOT NULL,
    approved BOOLEAN DEFAULT FALSE,
    requested_id int NULL,
    approved_id int NULL,
    FOREIGN KEY (requested_id) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_id) REFERENCES account(id) ON DELETE SET NULL
    );
