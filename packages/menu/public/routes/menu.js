'use strict';

angular.module('mean').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            // ties the 'menu builder' state to Menu.menus, defined at packages/menu/app.js
        	.state('menu builder', {
            	url: '/menu',
            	templateUrl: 'menu/views/index.html'
        	});
    }
]);
