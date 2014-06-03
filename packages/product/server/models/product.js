'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description :
    {
        type: String
    },
    ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}]
});

ProductSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Product', ProductSchema);
