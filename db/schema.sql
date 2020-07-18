DROP DATABASE IF EXISTS sglrw5f8uqwycqy1;

CREATE DATABASE sglrw5f8uqwycqy1;

USE sglrw5f8uqwycqy1;

CREATE TABLE cards (
  id int NOT NULL AUTO_INCREMENT,
  term VARCHAR(255) NOT NULL,
  definition VARCHAR(255) NOT NULL,
  topicId int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (topicId) REFERENCES topics(id)
);

CREATE TABLE topics (
  id int NOT NULL AUTO_INCREMENT,
  subject VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);