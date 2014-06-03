'use strict';

angular.module('mean').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Global', 'Products',
    function($scope, $stateParams, $location, Global, Products) {
        $scope.global = Global;

        $scope.hasAuthorization = function(product) {
            if (!product || !product.user) return false;
            return $scope.global.isAdmin || product.user._id === $scope.global.user._id;
        };

        $scope.create = function() {
            var product = new Products({
                name: this.name,
                description: this.description
            });
            product.$save(function(response) {
                $location.path('products/' + response._id);
            });

            this.name = '';
            this.description = '';
        };

        $scope.remove = function(product) {
            product.$remove();

            for (var i in $scope.products) {
                if ($scope.products[i] === product) {
                    $scope.products.splice(i, 1);
                }
            }
        };

        $scope.update = function() {
            var product = $scope.product;
            if (!product.updated) {
                product.updated = [];
            }
            product.updated.push(new Date().getTime());

            product.$update(function() {
                $location.path('products/' + product._id);
            });
        };

        $scope.find = function() {
            Products.query(function(products) {
                $scope.products = products;
            });
        };

        $scope.findOne = function() {
            Products.get({
                productId: $stateParams.productId
            }, function(product) {
                $scope.product = product;
            });
        };
    }
]);
