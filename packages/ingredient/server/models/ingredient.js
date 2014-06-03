'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

IngredientSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Ingredient', IngredientSchema);
