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

function post(data) {
    return new Promise(function(resolve, reject) {
        var newProduct = new ProductModel({});
        var mappedProduct = mapProductRequest(newProduct, data);
        mappedProduct.save()
            .then(function(data) {
                console.log('data');
                resolve(data);
            })
            .catch(function(err) {
                reject(err);
            });
    });
}

function find(condition) {
    return new Promise(function(resolve, reject) {
        ProductModel.find(condition).exec(function(err, products) {
            if (err) {
                reject(err);
            }
            resolve(products);
        });
    });
}

function update(id, data) {
    return new Promise(function(resolve, reject) {
        ProductModel.findById(id).exec(function(err, product) {
            if (err) {
                reject(err);
            } else {
                if (product) {
                    var updateProduct = mapProductRequest(product, data);
                    updateProduct.save(function(err, saved) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(saved);
                        }
                    });

                } else {
                    reject({
                        msg: 'product not found'
                    })
                }
            }
        });
    });
}

function deleteProduct(id) {
    return new Promise(function(resolve, reject) {
        ProductModel.findByIdAndRemove(id).exec(function(err, done) {
            if (err) {
                return reject(err);
            }
            resolve(done);
        });
    });
}

module.exports = {
    find: find,
    post: post,
    delete: deleteProduct,
    update: update
}