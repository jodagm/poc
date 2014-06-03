'use strict';

var mongoose = require('mongoose'),
    Ingredient = mongoose.model('Ingredient'),
    _ = require('lodash');

exports.ingredient = function(req, res, next, id) {
    Ingredient.load(id, function(err, ingredient) {
        if (err) return next(err);
        if (!ingredient) return next(new Error('Failed to load ingredient ' + id));
        req.ingredient = ingredient;
        next();
    });
};

exports.create = function(req, res) {
    var ingredient = new Ingredient(req.body);

    ingredient.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                ingredient: ingredient
            });
        } else {
            res.jsonp(ingredient);
        }
    });
};

exports.update = function(req, res) {
    var ingredient = req.ingredient;

    ingredient = _.extend(ingredient, req.body);

    ingredient.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                ingredient: ingredient
            });
        } else {
            res.jsonp(ingredient);
        }
    });
};

exports.destroy = function(req, res) {
    var ingredient = req.ingredient;

    ingredient.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                ingredient: ingredient
            });
        } else {
            res.jsonp(ingredient);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.ingredient);
};

exports.all = function(req, res) {
    Ingredient.find().sort('-created').exec(function(err, ingredients) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(ingredients);
        }
    });
};
