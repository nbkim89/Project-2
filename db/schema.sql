DROP DATABASE IF EXISTS flashcards_db;

CREATE DATABASE flashcards_db;

USE flashcards_db;

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