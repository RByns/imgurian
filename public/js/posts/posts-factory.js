angular.module('post')
    .factory('postFactory', ['$http', '$timeout', '$state', 'auth', 'dataFactory', '$q', function ($http, $timeout, $state, auth, dataFactory, $q) {

        var MAX_LOAD_POST_COUNT = 3;
        var posts = [];
        var isLoadingPosts = false;
        var postsCount = 0;
        var sortField = 'rating';
        var order = 'descending';

        var postService = {
            posts: posts,
            isLoadingPosts: isLoadingPosts,
            postsCount: postsCount,
            sortField: sortField,
            order: order,
            loadData: loadData,
            loadPosts: loadPosts,
            upvotePost: upvotePost,
            downvotePost: downvotePost,
            deletePost: deletePost,
            addPost: addPost,
        };
        return postService;

        function loadData() {
            return $q.all([dataFactory.getPosts()]);
        }

        function loadPosts() {
            if(!isLoadingPosts) {
                isLoadingPosts = true;
                return dataFactory
                    .loadPosts(postsCount, MAX_LOAD_POST_COUNT, sortField, order)
                    .then(function(res){
                        Array.prototype.push.apply(posts, res.data);
                        postsCount += MAX_LOAD_POST_COUNT;
                        $timeout(function() {
                            isLoadingPosts = false;
                        }, 500);
                    });
            }
        }

        function addPost(post){
          dataFactory
            .addPost(post)
            .then(function(res){
              $state.go('posts');
            });
        }

        function upvotePost(post) {
          dataFactory
              .upvotePost(post)
              .then(function(res){
                $state.go('posts');
              });
        }

        function downvotePost(post) {
          dataFactory
            .downvotePost(post)
            .then(function(res){
              $state.go('posts');
            });
        }

        function deletePost(post) {
          dataFactory
            .deletePost(post)
            .then(function(res){
              $state.go('posts');
            });
        }

    }]);
