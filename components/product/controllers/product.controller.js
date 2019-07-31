var ProductQuery = require('./../querys/product.query');

function post(req, res, next) {
    var image = req.file.mimetype.split('/')[0];

    if (image !== 'image') {
        return res.json({
            msg: 'please select valid file format'
        });
    }
    req.body.user = req.loggedInUser._id;
    req.body.image = req.file.filename;
    ProductQuery.post(req.body)
        .then(function(data) {
            console.log('done here tooo', data);
            res.status(200).json(data);
        })
        .catch(function(err) {
            console.log('her in error');
            next(err);
        });
}

function find(req, res, next) {
    var condition = {};
    if (req.loggedInUser.role != 2) {
        condition.user = req.loggedInUser._id;
    }
    ProductQuery.find(condition).
    then(function(data) {
            res.status(200).json(data);
        })
        .catch(function(err) {
            next(err);
        })
}

function getById(req, res, next) {
    var condition = {};
    condition._id = req.params.id;
    ProductQuery.find(condition).
    then(function(data) {
            res.status(200).json(data);
        })
        .catch(function(err) {
            next(err);
        })
}

function update(req, res, next) {
    ProductQuery.update(req.params.id, req.body)
        .then(function(data) {
            res.status(200).json(data);
        })
        .catch(function(err) {
            next(err);
        })

}

function deleteProduct(req, res, next) {
    ProductQuery.delete(req.params.id)
        .then(function(data) {
            res.status(200).json(data);
        })
        .catch(function(err) {
            next(err);
        })

}

module.exports = {
    post: post,
    find: find,
    getById: getById,
    update: update,
    delete: deleteProduct
}