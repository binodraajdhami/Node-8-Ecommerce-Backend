var jwt = require('jsonwebtoken');
var config = require('./../config');
var UserModel = require('./../models/users.model');

module.exports = function(req, res, next) {
    var token;
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    }
    if (req.headers.token) {
        token = req.headers.token;
    }
    if (req.query.token) {
        token = req.query.token;
    }

    if (token) {
        jwt.verify(token, config.app.jwtSecret, function(err, verifiedUser) {
            if (err) {
                return next(err);
            }
            if (verifiedUser) {
                UserModel.findById(verifiedUser.id).exec(function(err, user) {
                    if (err) {
                        return next(err);
                    }
                    if (user) {
                        req.loggedInUser = user;
                        return next();
                    } else {
                        res.json({
                            status: 204,
                            msg: 'User Not Found'
                        });
                    }
                });

            } else {
                return res.next({
                    status: 440,
                    msg: 'Your are not authorized'
                });
            }
        });
    } else {
        return next({
            status: 400,
            msg: 'Token not provided'
        });
    }
}