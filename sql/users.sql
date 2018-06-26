DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(100) NOT NULL,
    image_url VARCHAR(200),
    birthday VARCHAR(200),
    gender VARCHAR(200),
    city VARCHAR(200),
    date VARCHAR(200),
    rent INTEGER
);

SELECT * FROM users;
