CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  created_at INTEGER NOT NULL,
  user_id VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(60) NOT NULL,
  active_mission_id VARCHAR(20) NULL,
  avatar_url VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

INSERT INTO users 
(created_at, user_id, first_name)
VALUES (
  "now",
  "123456",
  "Dan"
);