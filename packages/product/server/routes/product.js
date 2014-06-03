'use strict';

var products = require('../controllers/product');

module.exports = function(Product, app) {

    app.route('/products')
        .get(products.all)
        .post(products.create);
    app.route('/products/:productId')
        .get(products.show)
        .put(products.update)
        .delete(products.destroy);

    app.param('productId', products.product);
};