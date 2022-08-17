DROP DATABASE IF EXISTS calendars;

CREATE DATABASE calendars CHARACTER SET 'UTF8';

USE calendars;

CREATE TABLE User (
    id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL ,
    ext_id VARCHAR(100) NOT NULL ,
    name VARCHAR(100) NOT NULL ,
    password VARCHAR(100) NOT NULL ,
    email VARCHAR(100) NOT NULL,
    createAt DATETIME NOT NULL ,
    status INTEGER NOT NULL ,
    UNIQUE KEY key_ext_id (ext_id) ,
    PRIMARY KEY (id)
);

CREATE TABLE Image (
    id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY ,
    file_name VARCHAR(100) UNIQUE NOT NULL
);