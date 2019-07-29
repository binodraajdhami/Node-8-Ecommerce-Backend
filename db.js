var mongoose = require('mongoose');
var config = require('./config');

var dbUrl;
if (process.env.ENVIRONMENT == 'prod') {
    dbUrl = config.mongodb.mlabdbUrl;
} else {
    dbUrl = config.mongodb.localdbUrl
}

mongoose.connect(dbUrl, function(err, done) {
    if (err) {
        console.log('Database connection error');
    } else {
        console.log('Database connection successfully');
    }
});