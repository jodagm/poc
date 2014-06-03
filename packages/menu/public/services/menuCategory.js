'use strict';

//MenuCategory service used for categories REST endpoint
angular.module('mean').factory('MenuCategory', ['$resource',
	function($resource) {
		return $resource('menuCategory/:categoryId', {
			categoryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
