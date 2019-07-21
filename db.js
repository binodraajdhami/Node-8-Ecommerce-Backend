var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.mongodb.dbUrl, function(err, done) {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database connection successfully');
    }
});