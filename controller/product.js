var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/images');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
var upload = multer({
    storage: storage
});
var authorize = require('./../middlewares/authorize');
var ProductModel = require('./../models/products.model');

function mapProductRequest(product, productDetails) {
    if (productDetails.name)
        product.name = productDetails.name;

    if (productDetails.brand)
        product.brand = productDetails.brand;

    if (productDetails.category)
        product.category = productDetails.category;

    if (productDetails.price)
        product.price = productDetails.price;

    if (productDetails.color)
        product.color = productDetails.color;

    if (productDetails.size)
        product.size = productDetails.size;

    if (productDetails.weight)
        product.weight = productDetails.weight;

    if (productDetails.quantity)
        product.quantity = productDetails.quantity;

    if (productDetails.quality)
        product.quality = productDetails.quality;

    if (productDetails.tags)
        product.tags = productDetails.tags.split(',');

    if (productDetails.status)
        product.status = productDetails.status;

    if (productDetails.description)
        product.description = productDetails.description;

    if (productDetails.image)
        product.image = productDetails.image

    if (productDetails.user)
        product.user = productDetails.user;

    return product;
}

module.exports = function() {

    router.route('/')
        .get(function(req, res, next) {
            var condtion = {};
            if (req.loggedInUser.role != 1) {
                condtion.user = req.loggedInUser._id;
            }
            ProductModel.find(condtion)
                .populate('user', { username: 1 })
                .exec(function(err, products) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json(products);
                });
        })
        .post(upload.single('image'), function(req, res, next) {
            console.log('req.file ', req.file);
            // if (req.file.mimetype == 'image/jpg' || req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png' || req.file.mimetype == 'image/gif') {
            var image = req.file.mimetype.split('/')[0];
            if (image !== 'image') {
                return res.json({
                    msg: 'Please select valid image format'
                });
            }
            req.body.user = req.loggedInUser._id;
            req.body.image = req.file.filename;
            var newProduct = new ProductModel({});
            var insertNewProduct = mapProductRequest(newProduct, req.body)
            insertNewProduct.save(function(err, product) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(product);
            });
        });

    router.route('/search')
        .get(function(req, res, next) {
            var condtion = {};
            var searchQuery = mapProductRequest(condtion, req.query);
            ProductModel.find(searchQuery).exec(function(err, product) {
                if (err) {
                    return next(err);
                }
                if (product.length) {
                    res.status(200).json(product);
                } else {
                    res.json({
                        msg: 'No any product matched your search query'
                    });
                }
            });
        })
        .post(function(req, res, next) {
            var condtion = {};
            var searchQuery = mapProductRequest(condtion, req.body);
            ProductModel.find(searchQuery).exec(function(err, product) {
                if (err) {
                    return next(err);
                }
                if (product.length) {
                    res.status(200).json(product);
                } else {
                    res.json({
                        msg: 'No any product matched your search query'
                    });
                }
            });
        });

    router.route('/:id')
        .get(authorize, function(req, res, next) {
            ProductModel.findById(req.params.id).exec(function(err, product) {
                if (err) {
                    return next(err);
                }
                if (product) {
                    res.status(200).json(product);
                } else {
                    res.json({
                        msg: 'Product Not Found'
                    });
                }
            });
        })
        .put(authorize, function(req, res, next) {
            ProductModel.findById(req.params.id).exec(function(err, product) {
                if (err) {
                    return next(err);
                }
                if (product) {
                    var updateProduct = mapProductRequest(product, req.body);
                    updateProduct.save(function(err, saved) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json(saved);
                    });
                } else {
                    res.json({
                        msg: 'Prouct Not Found'
                    });
                }
            });
        })
        .delete(authorize, function(req, res, next) {
            ProductModel.findById(req.params.id).exec(function(err, product) {
                if (err) {
                    return next(err);
                }
                if (product) {
                    product.remove(function(err, removed) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json(removed);
                    });
                } else {
                    res.json({
                        msg: 'Product Not Found'
                    })
                }
            });
        });

    return router
}