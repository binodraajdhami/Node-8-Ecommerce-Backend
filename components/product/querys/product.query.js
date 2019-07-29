var ProductModel = require('./../models/product.model');

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

function find(condition, cb) {
    ProductModel.find(condition).exec(function(err, product) {
        if (err) {
            return cb(err)
        }
        cb(product)
    });
}

function post(cb) {
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
}

module.exports = {
    find: find,
    post: post
}