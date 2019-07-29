var express = require('express');
var router = express.Router();
var productRoute = require('./../components/product/routes/product.router');

router.use('/product', productRoute);

module.exports = router;