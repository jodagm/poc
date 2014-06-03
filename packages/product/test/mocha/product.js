'use strict';

// there has to be a better way to bootstrap package models for mocha tests
require('../../server/models/product');

var should = require('should'),
    mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    Ingredient = mongoose.model('Ingredient');

//Globals
var salad;
var onion;

//The tests
describe('<Unit Test>', function() {
    describe('Model Product:', function() {
        beforeEach(function(done) {
            onion = new Ingredient({
               name: 'Onion'
            });
            salad = new Product({
                name: 'Salad',
                description: 'Product description',
                ingredients : [onion]
            });
            done();
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return salad.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without a name', function(done) {
                salad.name = '';

                return salad.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            salad.remove();
            onion.remove();
            done();
        });
    });
});
