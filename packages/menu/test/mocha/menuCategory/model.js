'use strict';

// there has to be a better way to bootstrap package models for mocha tests
require('../../../server/models/menuCategory');

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    MenuCategory = mongoose.model('MenuCategory');

//Globals
var drinks, drinks2;

//The tests
describe('<Unit Test>', function() {
    describe('Model MenuCategory:', function() {
        before(function(done) {
            drinks = new MenuCategory({
                name: 'Drinks',
            });
            drinks2 = new MenuCategory(drinks);
            done();
        });

        describe('Method Save', function() {
            it('should begin without the drinks category', function(done) {
                MenuCategory.find({ name: 'Drinks' }, function(err, categories) {
                    categories.should.have.length(0);
                    done();
                });
            });

            it('should be able to save without problems', function(done) {
                drinks.save(done);
            });

            it('should fail to save an existing menu category again', function(done) {
                drinks.save();
                return drinks2.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without name', function(done) {
                drinks.name = '';
                return drinks.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        after(function(done) {
            drinks.remove();
            done();
        });
    });
});
