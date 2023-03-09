CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  user_id VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(60) NOT NULL,
  call_sign VARCHAR(20) NOT NULL UNIQUE,
  active_mission_id VARCHAR(20) NOT NULL,
  avatar_url VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    user_id VARCHAR(255) NOT NULL UNIQUE,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    phone_id VARCHAR(255) NULL UNIQUE,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS mission_stats (
    id SERIAL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    user_id VARCHAR(255) NOT NULL UNIQUE,
    mission_id VARCHAR(20) NOT NULL,
    is_goal1_complete BOOLEAN NOT NULL DEFAULT false,
    is_goal2_complete BOOLEAN NOT NULL DEFAULT false,
    is_goal3_complete BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(20) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS finished_missions (
    id SERIAL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    user_id VARCHAR(255) NOT NULL UNIQUE,
    mission_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

ALTER TABLE finished_missions
ALTER COLUMN created_at
SET DEFAULT NOW();

INSERT INTO users 
(created_at, user_id, first_name)
VALUES (
  "now",
  "123456",
  "Dan"
);

-- TRANSACTION START

BEGIN;

UPDATE users
    SET active_mission_id = 'mars'
    WHERE user_id = '123456'
    RETURNING active_mission_id;

INSERT INTO mission_stats
    (user_id, mission_id, status)
VALUES ('123456', 'mars', 'active')
RETURNING status, is_goal1_complete, is_goal2_complete, is_goal3_complete;

COMMIT;

-- TRANSACTION END