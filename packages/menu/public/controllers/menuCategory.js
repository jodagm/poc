'use strict';

angular.module('mean').controller('MenuCategoryController', ['$scope', '$stateParams', '$location', 'Global', 'MenuCategory',
    function($scope, $stateParams, $location, Global, MenuCategory) {
        $scope.global = Global;
       
        $scope.create = function() {
            var category = new MenuCategory({
                name: this.categoryName
            });
            category.$save(function(response) {
                $location.path('menu');
            });
            this.categoryName = '';
            this.categories.splice(-1, 0, category);
        };

        $scope.find = function() {
            MenuCategory.query(function(menuCategories) {
                $scope.categories = menuCategories;
            });
        };

        $scope.remove = function(category) {
            category.$remove();

            for (var i in $scope.categories) {
                if ($scope.categories[i] === category) {
                    $scope.categories.splice(i, 1);
                }
            }
        };
    }
]);
