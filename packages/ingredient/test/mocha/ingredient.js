'use strict';

// there has to be a better way to bootstrap package models for mocha tests
require('../../server/models/ingredient');

var should = require('should'),
    mongoose = require('mongoose'),
    Ingredient = mongoose.model('Ingredient');

//Globals
var ingredient;

//The tests
describe('<Unit Test>', function() {
    describe('Model Ingredient:', function() {
        beforeEach(function(done) {
            ingredient = new Ingredient({
                name: 'Ketchup',
                quantity: 1.5
            });
            done();
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return ingredient.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without a name', function(done) {
                ingredient.name = '';

                return ingredient.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            ingredient.remove();
            done();
        });
    });
});
