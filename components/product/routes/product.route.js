var express = require('express');
var router = express.Router();
var productController = require('./../controllers/product.controller');
var multer = require('multer');

// simple upload without extension
// var upload = multer({ dest: './uploads/' })
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/images/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
var upload = multer({
    storage: storage
})

module.exports = function() {
    router.route('/')
        .get(productController.find)
        .post(upload.single('image'), productController.post)

    router.route('/:id')
        .get(productController.getById)
        .put(productController.update)
        .delete(productController.delete);

    router.route('/search')
        .get()
        .post();

    return router;
}