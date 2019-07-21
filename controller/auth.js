var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://127.0.0.1:27017/';
var dbName = 'mybackenddb';
var UserModel = require('./../models/users.model');

module.exports = function() {

    router.route('/')
        .get(function(req, res, next) {
            var username = req.query.username;
            var password = req.query.password;
            if (username && password) {
                res.render('dashboard', {});
            } else {
                res.render('index');
            }
        })
        .post(function(req, res, next) {

            MongoClient.connect(dbUrl, function(err, client) {
                if (err) {
                    console.log('Database connection error');
                    return next(err);
                }
                console.log('Database connection successful');
                var db = client.db(dbName);
                db.collection('students').find({ username: req.body.username, password: req.body.password }).toArray(function(err, student) {
                    if (student.length) {
                        res.redirect('/?username=' + req.body.username + '&password=' + req.body.password);
                    } else {
                        res.json({
                            Status: 204,
                            Message: 'Invalid Username and Password'
                        })
                    }
                });
            });

        })
        .put(function(req, res, next) {

        })
        .delete(function(req, res, next) {

        })

    router.route('/register')
        .get(function(req, res, next) {
            res.render('register');
        })
        .post(function(req, res, next) {

            console.log("req.body", req.body);
            var newUser = new UserModel({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                createDate: new Data()
            });
            newUser.save(function(err, done) {
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
        .get(function(req, res, next) {
            var username = req.query.username;
            var password = req.query.password;
            if (username && password) {
                res.render('dashboard', {});
            } else {
                res.render('index', {});
            }
        })
        .post(function(req, res, next) {

            MongoClient.connect(dbUrl, function(err, client) {
                if (err) {
                    console.log('Database connnection error');
                    return next(err);
                }
                console.log('Database connection successfuly');
                var db = client.db(dbName);
                db.collection('students').find({ username: req.body.username, password: req.body.password }).toArray(function(err, student) {
                    if (err) {
                        return next(err);
                    }
                    console.log('Students Data: ', student);
                    if (student.length) {
                        // res.json(student);
                        res.redirect('/?username=' + req.body.username + '&password=' + req.body.password);
                    } else {
                        res.json({
                            Status: 204,
                            Message: 'Invalid Username and Password'
                        });
                    }
                });
            });

        })
        .put(function(req, res, next) {

        })
        .delete(function(req, res, next) {

        })

    router.route('/forget')
        .get(function(req, res, next) {
            res.render('forget');
        })
        .post(function(req, res, next) {

        })
        .put(function(req, res, next) {

        })
        .delete(function(req, res, next) {

        })

    router.route('/user/:id')
        .get(function(req, res, next) {

            MongoClient.connect(dbUrl, function(err, client) {
                if (err) {
                    console.log('Database connction error');
                    return next(err);
                }
                console.log('Database connection successful');
                var db = client.db(dbName)
                db.collection('students').find({ _id: new mongodb.ObjectId(req.params.id) }).toArray(function(err, student) {
                    if (err) {
                        return next(err);
                    }
                    // res.render('editUser', student);
                    res.json(student);
                });
            });

        })
        .post(function(req, res, next) {
            res.json(req.body);
        })
        .put(function(req, res, next) {

            MongoClient.connect(dbUrl, function(err, client) {
                if (err) {
                    console.log('Database connection error');
                    return next();
                }
                console.log('Database connection successful');
                var db = client.db(dbName);
                db.collection('students').update({ _id: new mongodb.ObjectId(req.params.id) }, { $set: req.body }, function(err, student) {
                    if (err) {
                        return next(err);
                    }
                    res.json(student)
                });
            });

        })
        .delete(function(req, res, next) {

            MongoClient.connect(dbUrl, function(err, client) {
                if (err) {
                    console.log('Database connection error');
                    return next(err);
                }
                console.log('Database connection successful');
                var db = client.db(dbName);
                db.collection('students').remove({ _id: new mongodb.ObjectId(req.params.id) }, function(err, student) {
                    if (err) {
                        return next(err);
                    }
                    res.json(student);
                });
            });

        })

    return router;
}