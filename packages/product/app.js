'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Product = new Module('product');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Product.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Product.routes(app, auth, database);

    Product.menus.add({
        'roles': ['authenticated'],
        'title': 'Products',
        'link': 'all products'
    });
    Product.menus.add({
        'roles': ['authenticated'],
        'title': 'Create New Product',
        'link': 'create product'
    });

    return Product;
});
