angular.module('authentication').controller('AuthController', [
    '$scope',
    '$state',
    'auth',
    '$stateParams',
    function ($scope, $state, auth, $stateParams) {
        $scope.register = function () {
            auth.register($scope.user).error(function (error) {
                $scope.error = error;
            })
            .then(function () {
                $state.go('posts');
            });
        };

        $scope.logIn = function () {
            auth.logIn($scope.user).error(function (error) {
                $scope.error = error;
            })
            .then(function () {
                $state.go('posts');
            });
        };
    }
]);
