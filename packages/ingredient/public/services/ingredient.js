'use strict';

//Products service used for articles REST endpoint
angular.module('mean').factory('Ingredients', ['$resource',
    function($resource) {
        return $resource('ingredients/:ingredientId', {
            ingredientId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

