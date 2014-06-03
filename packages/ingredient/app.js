'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Ingredient = new Module('ingredient');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Ingredient.register(function(app, auth, database) {

    Ingredient.routes(app, auth, database);

    Ingredient.menus.add({
        'roles': ['authenticated'],
        'title': 'Ingredients',
        'link': 'all ingredients'
    });
    Ingredient.menus.add({
        'roles': ['authenticated'],
        'title': 'Create New Ingredient',
        'link': 'create ingredient'
    });

    return Ingredient;
});
