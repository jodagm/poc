'use strict';

(function() {
    describe('MEAN controllers', function() {
        describe('IngredientsController', function() {
            beforeEach(function() {
                this.addMatchers({
                    toEqualData: function(expected) {
                        return angular.equals(this.actual, expected);
                    }
                });
            });

            // Load the controllers module
            beforeEach(module('mean'));

            // Initialize the controller and a mock scope
            var IngredientsController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                IngredientsController = $controller('IngredientsController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one object ' +
                'fetched from XHR', function() {

                var ingredientName = 'Onion';
                // test expected GET request
                $httpBackend.expectGET('ingredients').respond([{
                    name: ingredientName
                }]);

                // run controller
                scope.find();
                $httpBackend.flush();

                // test scope value
                expect(scope.ingredients).toEqualData([{
                    name: ingredientName
                }]);

            });

            it('$scope.findOne() should create an array with one ingredient object fetched ' +
                'from XHR using a ingredientId URL parameter', function() {
                // fixture URL parament
                $stateParams.ingredientId = '525a8422f6d0f87f0e407a33';

                var ingredientName = 'onion';

                // fixture response object
                var testIngredientData = function() {
                    return {
                        title: ingredientName
                    };
                };

                // test expected GET request with response object
                $httpBackend.expectGET(/ingredients\/([0-9a-fA-F]{24})$/).respond(testIngredientData());

                // run controller
                scope.findOne();
                $httpBackend.flush();

                // test scope value
                expect(scope.ingredient).toEqualData(testIngredientData());

            });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {
                var ingredientName = 'Onion';
                var postIngredientData = function() {
                    return {
                        name: ingredientName
                    };
                };

                var responseIngredientData = function() {
                    return {
                        _id: '525cf20451979dea2c000001',
                        name: ingredientName
                    };
                };

                scope.name = ingredientName;

                // test post request is sent
                $httpBackend.expectPOST('ingredients', postIngredientData()).respond(responseIngredientData());

                // Run controller
                scope.create();
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.name).toEqual('');

                // test URL location to new object
                expect($location.path()).toBe('/ingredients/' + responseIngredientData()._id);
            });

            it('$scope.update() should update a valid ingredient', inject(function(Ingredients) {
                var ingredientName = 'onion';
                scope.name = ingredientName;
                var putIngredientData = function() {
                    return {
                        _id: '525a8422f6d0f87f0e407a33',
                        name: ingredientName,
                        to: ingredientName + 'updated'
                    };
                };

                scope.ingredient = new Ingredients(putIngredientData());

                // test PUT happens correctly
                $httpBackend.expectPUT(/ingredients\/([0-9a-fA-F]{24})$/).respond();

                // run controller
                scope.update();
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/ingredients/' + putIngredientData()._id);

            }));

            it('$scope.remove() should send a DELETE request with a valid ingredientId ' +
                'and remove the ingredient from the scope', inject(function(Ingredients) {

                var ingredient = new Ingredients({
                    _id: '525a8422f6d0f87f0e407a33'
                });

                scope.ingredients = [];
                scope.ingredients.push(ingredient);

                // test expected DELETE request
                $httpBackend.expectDELETE(/ingredients\/([0-9a-fA-F]{24})$/).respond(204);

                // run controller
                scope.remove(ingredient);
                $httpBackend.flush();

                // test after successful delete URL location ingredients lis
                //expect($location.path()).toBe('/ingredients');
                expect(scope.ingredients.length).toBe(0);
            }));
        });
    });
}());
