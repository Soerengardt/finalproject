const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const bodyParser = require('body-parser');
const db = require('./db.js');


////////////////////// MIDDLEWARE /////////////////////////

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require("cookie-parser")());

// app.use(compression());

app.use(express.static("./public"));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry`,
    maxAge: 1000 * 60 * 60
});

app.use(cookieSessionMiddleware);

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});


////////////////////// MIDDLEWARE ///////////////////////////////
////////////////////// AUTHENTIFICATION /////////////////////////

app.post("/register", function(req, res) {
    db
        .hashPassword(req.body.password)
        .then(function(hashedPass) {
            return db.register(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPass
            );
        })
        .then(function(result) {
            // console.log(result);
            const userId = result.rows[0].id;
            const role = req.body.role;
            db.defineRole(role, userId).then(function() {
                req.session.userId = userId;
                req.session.role = role;
                res.json({
                    success: true
                });
            });
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});

app.post("/login", function(req, res) {
    let userId;
    // let first;
    // let last;
    // console.log("inside /login", req.body);
    db.getUserByEmail(req.body.email).then(function(result) {
        // console.log(result);
        // first = result.rows[0].first;
        // last = result.rows[0].last;
        userId = result.rows[0].id;
        return db
            .checkPassword(req.body.password, result.rows[0].password)
            .then(doesMatch => {
                if (doesMatch) {
                    db
                        .getRoleByUserId(userId)
                        .then(data => {
                            req.session.userId = userId;
                            req.session.role = data.rows[0].role;
                            // req.session.first = first;
                            // req.session.last = last;
                            res.json({
                                success: true
                            });
                        })
                        .catch(function(err) {
                            console.log(err);
                            res.json({
                                success: false
                            });
                        });
                } else {
                    throw new Error();
                }
            });
    });
});


///////////////////// AUTHENTIFICATION /////////////////////////
///////////////////// LOGOUT /////////////////////////

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

///////////////////// LOGOUT /////////////////////////
///////////////////// PROFILE /////////////////////////

app.post("/profile", function(req, res) {
    db
        .createProfile(
            req.session.userId,
            req.body.bday,
            req.body.gender,
            req.body.city,
            req.body.date,
            req.body.rent
        )
        .then(function() {
            // console.log(data);
            res.json({
                success: true
            });
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});


///////////////////// PROFILE /////////////////////////
///////////////////// QUESTIONNAIRE /////////////////////////

app.get("/questions", function(req, res) {
    console.log(req.session.role);
    db
        .getQuestions(req.session.role)
        .then(data => {
            console.log("getQuestions", data);
            res.json({
                questions: data.rows
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.post("/questions", function(req, res) {
    db
        .writeAnswer(
            req.session.userId,
            req.body.questId,
            req.body.answ
        )
        .then(function() {
            // console.log(data);
            res.json({
                success: true
            });
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});


///////////////////// QUESTIONNAIRE /////////////////////////
///////////////////// MATCHING /////////////////////////

app.get("/matches", function(req, res) {
    db
        .getAnswers()
        .then(data => {
            // console.log(req.session.role);
            let othersQuestionsArr = [];
            if (req.session.role == "tenant") {
                othersQuestionsArr = [4, 5, 6];
            } else {
                othersQuestionsArr = [1, 2, 3];
            }

            let othersAnswersArr = data.rows.filter(elem => {
                return (
                    elem.question_id == othersQuestionsArr[0] ||
                    elem.question_id == othersQuestionsArr[1] ||
                    elem.question_id == othersQuestionsArr[2]
                );
            });
            // console.log("These are the others answers", othersAnswersArr);

            db.getAnswersByUserId(req.session.userId).then(function(data) {
                // console.log("These are my answers", data.rows.length);
                data.rows.forEach(function(answer) {
                    // console.log("This is the answer", answer);
                    // console.log("This is the sata.othersAnswersArr", othersAnswersArr);
                    let relevantAnswer;

                    if (answer.question_id == 1) {
                        relevantAnswer = othersAnswersArr.filter(
                            answer => answer.question_id == 4
                        );
                    }
                    if (answer.question_id == 2) {
                        relevantAnswer = othersAnswersArr.filter(
                            answer => answer.question_id == 5
                        );
                    }
                    if (answer.question_id == 3) {
                        relevantAnswer = othersAnswersArr.filter(
                            answer => answer.question_id == 6
                        );
                    }
                    if (answer.question_id == 4) {
                        relevantAnswer = othersAnswersArr.filter(
                            answer => answer.question_id == 1
                        );
                    }
                    if (answer.question_id == 5) {
                        relevantAnswer = othersAnswersArr.filter(
                            answer => answer.question_id == 2
                        );
                    }
                    if (answer.question_id == 6) {
                        relevantAnswer = othersAnswersArr.filter(
                            answer => answer.question_id == 3
                        );
                    }
                    // console.log("Relevant answer", answer);
                    relevantAnswer.forEach(item => {
                        // console.log("Item.answer", item.answer);
                        // console.log("data.rows[i].answer", data.rows[i].answer);
                        item.diff = Math.abs(item.answer - answer.answer);
                    });
                    // console.log(relevantAnswer);
                    relevantAnswer.sort(function(a, b) {
                        return a.diff - b.diff;
                    });
                    console.log(relevantAnswer);
                    // var obj = {};
                    //
                    // relevantAnswer.forEach(function(a) {
                    //     obj[a.id] = a.diff;
                    // });
                    // relevantAnswer2.forEach(function(a) {
                    //     obj[a.id] += a.diff;
                    // });
                    // relevantAnswer3.forEach(function(a) {
                    //     obj[a.id] += a.diff;
                    // });

                });
                // res.json({
                //     :
                // });
            });
        })
        .catch(function(err) {
            console.log(err);
        });
});



///////////////////// MATCHING /////////////////////////
////////////////////// ROUTES /////////////////////////

app.get('/welcome', function(req, res) {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('*', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


////////////////////// ROUTES /////////////////////////
////////////////////// SERVER /////////////////////////

app.listen(8080, function() {
    console.log("I'm listening.");
});
