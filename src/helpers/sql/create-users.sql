CREATE TABLE IF NOT EXISTS users (
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(60) NOT NULL,
    call_sign VARCHAR(20) NOT NULL UNIQUE,
    active_mission_id VARCHAR(20) NULL,
    avatar_url VARCHAR(255) NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS accounts (
    id INT NOT NULL AUTO_INCREMENT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id VARCHAR(255) NOT NULL UNIQUE,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    phone_id VARCHAR(255) NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS finished_missions (
    id INT NOT NULL AUTO_INCREMENT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id VARCHAR(255) NOT NULL UNIQUE,
    mission_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS mission_stats (
    id INT NOT NULL AUTO_INCREMENT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id VARCHAR(255) NOT NULL UNIQUE,
    mission_id VARCHAR(20) NOT NULL,
    is_goal1_complete BOOLEAN NOT NULL DEFAULT false,
    is_goal2_complete BOOLEAN NOT NULL DEFAULT false,
    is_goal3_complete BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(20) NULL,
    PRIMARY KEY (id)
);

ALTER TABLE users
MODIFY active_mission_id VARCHAR(20) NULL;

INSERT INTO users
(user_id, first_name, call_sign)
VALUES ('2468', 'Nike', 'Bitch Claw');

INSERT INTO accounts
(user_id, email_address)
VALUES ('123456', 'dan@dan.com');

SELECT first_name, call_sign, active_mission_id, avatar_url
FROM users WHERE user_id = '654321';

UPDATE users
SET active_mission_id = 'mars'
WHERE user_id = '123456';

SELECT * FROM finished_missions;

INSERT INTO mission_stats
(user_id, mission_id, status)
VALUES ('123456', 'mars', 'active');

UPDATE users
SET active_mission_id = null
WHERE user_id = '123456';

INSERT INTO finished_missions
(user_id, mission_id)
VALUES ('123456', 'mars');