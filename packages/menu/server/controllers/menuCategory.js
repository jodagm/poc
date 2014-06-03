'use strict';

var mongoose = require('mongoose'),
    MenuCategory = mongoose.model('MenuCategory');

/**
 * Create a menu category
 */
exports.create = function(req, res) {
    var menuCategory = new MenuCategory(req.body);

    menuCategory.save(function(err) {
        if (err) {
        	res.render('error', {
                status: 500,
                error: err
            });
        } else {
            res.jsonp(menuCategory);
        }
    });
};

/**
 * Find category by id
 */
exports.category = function(req, res, next, id) {
    MenuCategory.load(id, function(err, category) {
        if (err) return next(err);
        if (!category) return next(new Error('Failed to load category ' + id));
        req.category = category;
        next();
    });
};

/**
 * Delete a menu category
 */
exports.destroy = function(req, res) {
    var category = req.category;
    category.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: category
            });
        } else {
            res.jsonp(category);
        }
    });
};

/**
 * List of Menu Categories
 */
exports.all = function(req, res) {
    MenuCategory.find().exec(function(err, categories) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(categories);
        }
    });
};