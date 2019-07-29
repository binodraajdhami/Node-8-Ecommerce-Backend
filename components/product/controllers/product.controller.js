var ProductQuery = require('./../querys/product.query');

function get(req, res, next) {
    var condtion = {};
    if (req.loggedInUser.role != 1) {
        condtion.user = req.loggedInUser._id;
    }

    ProductQuery.find(condtion, function(err, product) {
        if (err) {
            return next(err);
        }
        res.status(200).json(product);
    });
    // ProductModel.find(condtion)
    //     .populate('user', { username: 1 })
    //     .exec(function(err, products) {
    //         if (err) {
    //             return next(err);
    //         }
    //         res.status(200).json(products);
    //     });
}

function post(req, res, next) {
    var image = req.file.mimetype.split('/')[0];
    if (image !== 'image') {
        return res.json({
            msg: 'Please select valid image format'
        });
    }
    // req.body.user = req.loggedInUser._id;
    // req.body.image = req.file.filename;
    // var newProduct = new ProductModel({});
    // var insertNewProduct = mapProductRequest(newProduct, req.body)
    // insertNewProduct.save(function(err, product) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.status(200).json(product);
    // });
}

module.exports = {
    get: get,
    post: post
}