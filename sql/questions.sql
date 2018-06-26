DROP TABLE IF EXISTS questions;

CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    role VARCHAR(200),
    type VARCHAR(200),
    question VARCHAR(200)
);

INSERT INTO questions (id, role, type, question) VALUES (
    '1',
    'tenant',
    'range',
    'How clean would you like your flat to be?'
);

INSERT INTO questions (id, role, type, question) VALUES (
    '2',
    'tenant',
    'range',
    'How likely would you hang out with your roomies?'
);

INSERT INTO questions (id, role, type, question) VALUES (
    '3',
    'tenant',
    'range',
    'How much noise can you stand in your flat?'
);

INSERT INTO questions (id, role, type, question) VALUES (
    '4',
    'landlord',
    'range',
    'How clean would you like your flatmate to be?'
);

INSERT INTO questions (id, role, type, question) VALUES (
    '5',
    'landlord',
    'range',
    'How often does your shared flat hang out with each other?'
);

INSERT INTO questions (id, role, type, question) VALUES (
    '6',
    'landlord',
    'range',
    'How quiet does the roommate have to be?'
);
