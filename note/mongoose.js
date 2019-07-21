// Install Mongoose
// npm install mongoose --save

// Step: 1
// - Setup url in config folder
module.exports.mongodb = {
    dbUrl: 'mongodb://127.0.0.1:27017/dbbackendone'
}

// Step: 2
// - make db.js file main root for mongoose
var mongoose = require('mongoose');
var config = require('./config/index');

mongoose.connect(config.mongodb.dbUrl, function(err, done) {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database connection successful');
    }
})

// Step: 3
// call file inside server.js
var config = require('./config/index');
require('./db');