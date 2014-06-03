'use strict';

angular.module('mean').controller('IngredientsController', ['$scope', '$stateParams', '$location', 'Global', 'Ingredients',
    function($scope, $stateParams, $location, Global, Ingredients) {
        $scope.global = Global;

        $scope.hasAuthorization = function(ingredient) {
            if (!ingredient || !ingredient.user) return false;
            return $scope.global.isAdmin || ingredient.user._id === $scope.global.user._id;
        };

        $scope.create = function() {
            var ingredient = new Ingredients({
                name: this.name
            });
            ingredient.$save(function(response) {
                $location.path('ingredients/' + response._id);
            });

            this.name = '';
        };

        $scope.remove = function(ingredient) {
            ingredient.$remove();

            for (var i in $scope.ingredients) {
                if ($scope.ingredients[i] === ingredient) {
                    $scope.ingredients.splice(i, 1);
                }
            }
        };

        $scope.update = function() {
            var ingredient = $scope.ingredient;
            if (!ingredient.updated) {
                ingredient.updated = [];
            }
            ingredient.updated.push(new Date().getTime());

            ingredient.$update(function() {
                $location.path('ingredients/' + ingredient._id);
            });
        };

        $scope.find = function() {
            Ingredients.query(function(ingredients) {
                $scope.ingredients = ingredients;
            });
        };

        $scope.findOne = function() {
            Ingredients.get({
                ingredientId: $stateParams.ingredientId
            }, function(ingredient) {
                $scope.ingredient = ingredient;
            });
        };
    }
]);
