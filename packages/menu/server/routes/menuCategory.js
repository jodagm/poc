'use strict';

var categories = require('../controllers/menuCategory');

module.exports = function(MenuCategory, app) {

    app.route('/menuCategory')
        .get(categories.all)
        .post(categories.create);
    app.route('/menuCategory/:categoryId')
        .delete(categories.destroy);

    // Finish with setting up the categoryId param, this will make sure the req.category holds the category object
    // corresponding to the categoryId param. the http request with DELETE verb does not contain body, we need to manually
    // add it by this callback.
    app.param('categoryId', categories.category);
};