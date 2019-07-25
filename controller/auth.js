var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var config = require('./../config');
var authenticate = require('./../middlewares/authenticate');
var UserModel = require('./../models/users.model');

function mapUserRequest(user, userDetails) {
    if (userDetails.name)
        user.name = userDetails.name;

    if (userDetails.email)
        user.email = userDetails.email;

    if (userDetails.username)
        user.username = userDetails.username;

    if (userDetails.password)
        user.password = passwordHash.generate(userDetails.password);

    if (userDetails.phone)
        user.phone = userDetails.phone;

    if (userDetails.address)
        user.address = userDetails.address;

    if (userDetails.role)
        user.role = userDetails.role;

    return user;
}

module.exports = function() {

    router.route('/')
        .get(function(req, res, next) {
            res.json({
                status: 200,
                msg: 'Welcome to home page of auth route'
            });
        })
        .post(function(req, res, next) {

            UserModel.find({
                username: req.body.username,
                password: req.body.password
            }).exec(function(err, user) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(user);
            });

        })

    router.route('/register')
        .get()
        .post(function(req, res, next) {

            console.log("req.body", req.body);
            var newUser = new UserModel({});
            var insertNewUser = mapUserRequest(newUser, req.body);
            insertNewUser.save(function(err, done) {
                if (err) {
                    console.log('User created Failed');
                    return next(err);
                }
                console.log('user successfully created ', done);
                res.status(200);
                res.json(done);
            });

        });

    router.route('/login')
        .get()
        .post(function(req, res, next) {

            UserModel.findOne({
                username: req.body.username
            }).exec(function(err, user) {
                if (err) {
                    return next(err);
                }
                if (user) {
                    var matched = passwordHash.verify(req.body.password, user.password);
                    if (matched) {
                        var token = jwt.sign({ id: user._id, name: user.name, username: user.username }, config.app.jwtSecret);
                        res.json({
                            token: token,
                            user: user
                        });
                    } else {
                        res.json({
                            msg: 'Username or Password doesnot match'
                        });
                    }
                } else {
                    res.json({
                        msg: 'Username or Password doesnot match'
                    });
                }
            });

        })

    router.route('/forget')
        .get(function(req, res, next) {
            res.render('forget');
        })
        .post(function(req, res, next) {

        })

    router.route('/user')
        .get(authenticate, function(req, res, next) {

            UserModel.find({})
                // UserModel.find({}, { name: 0, email: 0 })
                // .limit(3)
                // .sort({
                //     _id: -1
                // })
                // .skip(1)
                .exec(function(err, user) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json(user);
                });
        });

    router.route('/user/:id')
        .get(authenticate, function(req, res, next) {

            UserModel.findOne({ _id: req.params.id }, function(err, user) {
                if (err) {
                    return next(err);
                }
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.json({
                        msg: 'User not found'
                    })
                }
            });

        })
        .put(authenticate, function(req, res, next) {

            UserModel.findOne({ _id: req.params.id }, function(err, user) {
                if (err) {
                    return next(err);
                }
                if (user) {
                    var updateUser = mapUserRequest(user, req.body);
                    updateUser.save(function(err, saved) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json(saved)
                    });
                } else {
                    res.json({
                        msg: 'User Not Found'
                    });
                }
            });

        })
        .delete(authenticate, function(req, res, next) {

            UserModel.findOne({ _id: req.params.id }, function(err, user) {
                if (err) {
                    return next();
                }
                if (user) {
                    user.remove(function(err, removed) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json(removed)
                    });
                } else {
                    res.json({
                        msg: 'User Not Found'
                    })
                }
            });

        })

    return router;
}