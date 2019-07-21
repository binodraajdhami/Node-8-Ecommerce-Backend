var express = require('express');
var app = express();
var config = require('./config');
require('./db');

// Imports Route Files
var indexRoute = require('./controller/index')();
var authRoute = require('./controller/auth')();

// Imports Middewares
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var authorize = require('./middlewares/authorize');
var authenticate = require('./middlewares/authenticate');

// View engine setup and pug is used
var pug = require('pug');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Inbuilt Middleware
app.use('/', authRoute);
// app.use('/img', express.static('uploads/images'));
app.use('/img', express.static(path.join(__dirname, 'uploads/images')));
app.use('/home', authorize, indexRoute);
app.use('/auth', authenticate, authorize, authRoute);
app.use('/user', authenticate, authorize, authRoute);
app.use('/product', authenticate, authorize, authRoute);

app.use(function(req, res, next) {
    next({
        Status: 404,
        msg: 'Not Found'
    });
});

// Error Handling Middleware
app.use(function(err, req, res, next) {
    res.json({
        Status: err.Status || 4040,
        ErrorText: err.msg || err
    });
});

app.listen(config.app.port, function(err, done) {
    if (err) {
        console.log('Server listening failed');
    } else {
        console.log('Server listening successful');
    }
});