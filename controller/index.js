var express = require('express');
var router = express.Router();
var fs = require('fs');

module.exports = function(){
    router.get('/', function(req, res, next){
        res.render('index', {});
    })

    router.get('/create', function(req, res, next){
        fs.writeFile('xyz.txt', 'Hello World', function(err, done){
            if(err){
                return next(err);
            }
            res.json(done);
        })
    })

    router.get('/read', function(req, res, next){
        fs.readFile('abc.txt', 'UTF-8', function(err, done){
            if(err){
                return next(err);
            }
            res.json(done);
        })
    })

    router.get('/auth', function(req, res, next){
        res.json({
            msg: 'You are at home page of index route'
        });
    })
    
    router.post('/', function(req, res, next){
    
    })
    
    router.put('/', function(req, res, next){
    
    })
    
    router.delete('/', function(req, res, next){
        
    })

    return router;
}