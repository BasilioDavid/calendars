DROP DATABASE IF EXISTS calendars;

CREATE DATABASE calendars CHARACTER SET 'UTF8';

USE calendars;

CREATE TABLE user_status (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    type VARCHAR(100) NOT NULL
);

CREATE TABLE user (
    id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL ,
    ext_id VARCHAR(100) NOT NULL ,
    name VARCHAR(100) NOT NULL ,
    password VARCHAR(100) NOT NULL ,
    email VARCHAR(100) NOT NULL,
    create_at DATETIME NOT NULL DEFAULT NOW(),
    status_id INTEGER NOT NULL ,
    UNIQUE KEY key_ext_id (ext_id) ,
    UNIQUE KEY key_email (email) ,
    PRIMARY KEY (id),
    FOREIGN KEY user(status_id) REFERENCES user_status(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE calendar (
    id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY ,
    ext_id VARCHAR(100) NOT NULL UNIQUE ,
    name VARCHAR(255) NOT NULL ,
    user_id BIGINT UNSIGNED NOT NULL ,
    status_id INTEGER NOT NULL ,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE image (
    calendar_id BIGINT UNSIGNED NOT NULL,
    file_name VARCHAR(100) NOT NULL,
    part_number TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (calendar_id, file_name),
    FOREIGN KEY (calendar_id) REFERENCES calendar(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `order` (
	id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY ,
	postal_code char(5) NOT NULL,
	city varchar(255) NOT NULL,
    contact_number INT NOT NULL,
	direction varchar(255) NOT NULL,
	specifications varchar(255) NULL,
    ordered_at TIMESTAMP NOT NULL,
    delivered_at TIMESTAMP NULL,
	instructions text NULL,
	calendar_id BIGINT UNSIGNED NOT NULL,
	FOREIGN KEY (calendar_id) REFERENCES calendar(id)
);
