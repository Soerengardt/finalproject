var spicedPg = require("spiced-pg");
const bcrypt = require("bcryptjs");

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/superroomie"
);

////////////////////// REGISTER /////////////////////////

module.exports.register = function register(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first, last`,
        [first || null, last || null, email , password]
    );
};

module.exports.defineRole = function defineRole(role, userId) {
    return db.query(
        `INSERT INTO roles (role, user_id) VALUES ($1, $2) RETURNING role, user_id`,
        [role, userId]
    );
};


////////////////////// REGISTER /////////////////////////
////////////////////// LOGIN /////////////////////////

module.exports.getUserByEmail = function getUserByEmail(email) {
    console.log(email);
    return db.query(
        `
        SELECT id, first, last, password
        FROM users
        WHERE email = $1`,
        [email]
    );
};

module.exports.getRoleByUserId = function getRoleByUserId(userId) {
    return db.query(
        `
        SELECT role
        FROM roles
        WHERE user_Id = $1`,
        [userId]
    );
};


////////////////////// LOGIN /////////////////////////
///////////////////// PROFILE /////////////////////////

module.exports.createProfile = function createProfile(userId, birthday, gender, city, date, rent) {
    return db.query(
        `
        UPDATE users
        SET birthday = $2, gender = $3, city = $4, date = $5, rent = $6
        WHERE id = $1
        RETURNING id, birthday, gender, city, date, rent`,
        [userId, birthday, gender, city, date, rent]
    );
};



///////////////////// PROFILE /////////////////////////
////////////////////// QUESTIONNAIRE /////////////////////////

module.exports.getQuestions = function getQuestions(role) {
    return db.query(
        `
        SELECT *
        FROM questions
        WHERE role = $1`,
        [role]
    );
};

module.exports.writeAnswer = function writeAnswer(userId, questId, answer) {
    return db.query(
        `
        INSERT INTO answers (user_id, question_id, answer) VALUES ($1, $2, $3) RETURNING *
        `,
        [userId, questId, answer]
    );
};

////////////////////// QUESTIONNAIRE /////////////////////////
////////////////////// MATCHING /////////////////////////

// module.exports.getMatches = function getMatches(userId, questId, answer) {
//     return db.query(
//         `
//         INSERT INTO answers (user_id, question_id, answer) VALUES ($1, $2, $3) RETURNING *
//         `,
//         [userId, questId, answer]
//     );
// };

////////////////////// MATCHING /////////////////////////
////////////////////// PASSWORD /////////////////////////

module.exports.hashPassword = function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            // console.log(salt);
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }

                resolve(hash);
            });
        });
    });
};

module.exports.checkPassword = function checkPassword(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};

////////////////////// PASSWORD /////////////////////////
