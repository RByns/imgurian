angular.module('navigation')
    .controller('NavController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.currentUser = auth.currentUser;
        vm.logOut = auth.logOut;
        vm.hideNav = checkToHideNav($location.$$path);

        $scope.$watch(function() {
            return $location.$$path;
        }, function(value) {
            vm.hideNav = checkToHideNav($location.$$path);
            if(!vm.hideNav && ! auth.isLoggedIn) {
                $state.go('home');
            }
        });

        function checkToHideNav(path) {
            return path === '/home' || path === '/login-or-register' || path === '/login' || path == '/register';
        }
    }]);
