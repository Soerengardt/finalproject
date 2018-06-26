DROP TABLE IF EXISTS roles;

CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    role VARCHAR(200)
);

SELECT * FROM roles;
