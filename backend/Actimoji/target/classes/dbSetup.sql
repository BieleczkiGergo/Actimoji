DROP DATABASE IF EXISTS `Actimoji`;
DROP USER IF EXISTS 'actimoji_user'@'localhost';


CREATE DATABASE `Actimoji`;

CREATE USER 'actimoji_user'@'localhost' IDENTIFIED BY 'asd123';

GRANT SELECT, UPDATE, DELETE, INSERT, CREATE, DROP, ALTER ON `Actimoji`.* TO 'actimoji_user'@'localhost';

FLUSH PRIVILEGES;
