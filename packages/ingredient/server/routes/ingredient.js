'use strict';

var ingredients = require('../controllers/ingredient');

module.exports = function(Product, app) {

    app.route('/ingredients')
        .get(ingredients.all)
        .post(ingredients.create);
    app.route('/ingredients/:ingredientId')
        .get(ingredients.show)
        .put(ingredients.update)
        .delete(ingredients.destroy);

    app.param('ingredientId', ingredients.ingredient);
};