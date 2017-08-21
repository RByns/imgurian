angular.module('authentication').factory('auth', ['$http', '$window', '$rootScope', function ($http, $window, $rootScope) {
    var auth = {};

    auth.saveToken = function (token) {
        $window.localStorage['imgurian-token'] = token;
    };

    auth.getToken = function () {
        return $window.localStorage['imgurian-token'];
    };

    auth.isLoggedIn = function () {
        var token = auth.getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;

        } else {
            return false;
        }
    };

    auth.currentUser = function () {
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    auth.register = function (userData) {
        return $http.post('/register', userData).success(function (data) {
            auth.saveToken(data.token);
        });
    };

    auth.logIn = function (userData) {
        return $http.post('/login', userData).success(function (data) {
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function () {
        $window.localStorage.removeItem('imgurian-token');
    };

    return auth;
}]);
