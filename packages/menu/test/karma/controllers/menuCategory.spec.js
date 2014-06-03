'use strict';

(function() {
    // Menu Category Controller Spec
    describe('MEAN controllers', function() {
        describe('MenuCategoryController', function() {
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
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
            var MenuCategoryController,
                scope,
                $httpBackend,
                $stateParams,
                $location;

            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

                scope = $rootScope.$new();

                MenuCategoryController = $controller('MenuCategoryController', {
                    $scope: scope
                });

                $stateParams = _$stateParams_;

                $httpBackend = _$httpBackend_;

                $location = _$location_;

            }));

            it('$scope.find() should create an array with at least one menu category object ' +
                'fetched from XHR', function() {

                var expectedCategoryName = 'Drinks';
                // test expected GET request
                $httpBackend.expectGET('menuCategory').respond([{
                    name: expectedCategoryName
                }]);

                // run controller
                scope.find();
                $httpBackend.flush();

                // test scope value
                expect(scope.categories).toEqualData([{
                    name: expectedCategoryName
                }]);

            });

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'show the new category in the list', function() {

                var expectedCategoryName = 'Main Coarse';

                // fixture expected POST data
                var postCategoryData = function() {
                    return {
                        name: expectedCategoryName
                    };
                };

                // fixture expected response data
                var responseCategoryData = function() {
                    return {
                        _id: '525cf20451979dea2c000001',
                        name: expectedCategoryName
                    };
                };
                // mock categories in scope
                scope.categories = [];
                // fixture mock form input values
                scope.categoryName = expectedCategoryName;

                // test post request is sent
                $httpBackend.expectPOST('menuCategory', postCategoryData()).respond(responseCategoryData());

                // Run controller
                scope.create();
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.categoryName).toEqual('');
                expect(scope.categories.length).toBe(1);
                expect($location.path()).toBe('/menu');
            });

            it('$scope.remove() should send a DELETE request with a valid categoryId ' +
                'and remove the menu category from the scope', inject(function(MenuCategory) {

                // fixture category
                var menuCategory = new MenuCategory({
                    _id: '525a8422f6d0f87f0e407a33'
                });

                // mock categories in scope
                scope.categories = [];
                scope.categories.push(menuCategory);

                // test expected category DELETE request
                $httpBackend.expectDELETE(/menuCategory\/([0-9a-fA-F]{24})$/).respond(204);

                // run controller
                scope.remove(menuCategory);
                $httpBackend.flush();

                // test after successful delete URL location categories list
                expect(scope.categories.length).toBe(0);
                //expect($location.path()).toBe('/menu');
            }));
        });
    });
}());
