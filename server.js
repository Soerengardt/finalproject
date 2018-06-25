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


////////////////////// MIDDLEWARE /////////////////////////
////////////////////// ROUTES /////////////////////////

app.post("/register", function(req, res) {
    db.hashPassword(req.body.password).then(function(hashedPass) {
        return Promise.all([
            db.register(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPass
            ),
            db.defineRole(req.body.role)
        ]).then(function([data1, data2]) {
            console.log("This is the data:", data1, data2);
        });
        // .then(function() {
        //     res.json({
        //         success: true
        //     });
        // })
        // .catch(function(err) {
        //     console.log(err);
        //     res.json({
        //         success: false
        //     });
        // });
    });
});





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
