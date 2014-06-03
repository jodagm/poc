'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };
        // states for my app
        $stateProvider
            .state('all ingredients', {
                url: '/ingredients',
                templateUrl: 'ingredient/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create ingredient', {
                url: '/ingredients/create',
                templateUrl: 'ingredient/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit ingredient', {
                url: '/ingredients/:ingredientId/edit',
                templateUrl: 'ingredient/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('ingredient by id', {
                url: '/ingredients/:ingredientId',
                templateUrl: 'ingredient/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
