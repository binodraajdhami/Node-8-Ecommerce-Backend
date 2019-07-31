var express = require('express');
var router = express.Router();
var authenticate = require('./../middlewares/authenticate');
var productRoute = require('./../components/product/routes/product.route')();

router.use('/product', authenticate, productRoute);

module.exports = router;