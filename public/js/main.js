var app = angular.module('imgurian', ['ui.router', 'ngAnimate', 'authentication', 'post', 'navigation']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                onEnter: function ($q, auth, $state) {
                    if (auth.isLoggedIn()) {
                        $state.go('posts');
                    }
                }
            })
            .state('login-or-register', {
                url: '/login-or-register',
                templateUrl: '/login-or-register.html',
                onEnter: function ($q, auth, $state) {
                    if (auth.isLoggedIn()) {
                        $state.go('posts');
                    }
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: '/register.html',
                controller: 'AuthController',
                onEnter: function ($q, auth, $state) {
                    if (auth.isLoggedIn()) {
                        $state.go('posts');
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: '/login.html',
                controller: 'AuthController',
                onEnter: function ($q, auth, $state) {
                    if (auth.isLoggedIn()) {
                        $state.go('posts');
                    }
                }
            })
            .state('makePost', {
              url: '/makePost',
              templateUrl: '/makePost.html',
              controller: 'PostController',
              controllerAs: 'vm',
              onEnter: function ($q, auth, $state) {
                  if (!auth.isLoggedIn()) {
                      $state.go('home');
                    }
                  }
            })
            .state('posts', {
                url: '/posts',
                templateUrl: '/posts.html',
                controller: 'PostController',
                controllerAs: 'vm',
                onEnter: function ($q, auth, $state) {
                    if (!auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }
            });

          $urlRouterProvider.otherwise('home');
    }
]);

/**
.state('postSelection', {
    url: '/post',
    templateUrl: '/post.html',
    controller: 'PostController',
    controllerAs: 'vm',
    onEnter: function ($q, auth, $state) {
        if (!auth.isLoggedIn()) {
            $state.go('home');
        }
    }
})
.state('postRating', {
    url: '/post-rating',
    templateUrl: '/post-rating.html',
    controller: 'ChallengesController',
    controllerAs: 'vm',
    onEnter: function ($q, auth, $state) {
            if (!auth.isLoggedIn()) {
                $state.go('home');
            }
    }
}*/
