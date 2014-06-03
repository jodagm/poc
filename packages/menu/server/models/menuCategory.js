'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var MenuCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    menues: {
        type: Array
    }
});

/**
 * Statics
 */
MenuCategorySchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('MenuCategory', MenuCategorySchema);
