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
        [first || null, last || null, email || null, password || null]
    );
};

module.exports.defineRole = function defineRole(role) {
    return db.query(
        `INSERT INTO roles (role) VALUES ($1) RETURNING id, role`,
        [role || null]
    );
};



////////////////////// REGISTER /////////////////////////
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


////////////////////// PASSWORD /////////////////////////
