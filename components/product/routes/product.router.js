var express = require('express');
var router = express.Router();
var productController = require('./../controllers/product.controller');

module.exports = function() {

    router.route('/')
        .get(productController.get)
        .put(productController.post);

    router.route('/:id')
        .get()
        .put();

    router.route('/search')
        .get()
        .post();

    return router;
}