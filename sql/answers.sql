DROP TABLE IF EXISTS answers;

CREATE TABLE answers(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    question_id INTEGER,
    answer VARCHAR(200)
);

SELECT * FROM answers;
