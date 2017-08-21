angular.module('post')
    .controller('PostController', ['postFactory', function (postFactory) {
        var vm = this;

        vm.postToView = null;
        vm.loadPosts = postFactory.loadPosts;

        postFactory
            .loadData()
            .then(function (res) {
                vm.isLoadingPosts = postFactory.isLoadingPosts;
                vm.sortField = postFactory.sortField;
                vm.order = postFactory.order;
                vm.postsCount = 0;
                vm.posts = postFactory.posts;

            });

        vm.addPost = function(post){
          postFactory.addPost(post);
        };

        vm.upvotePost = function(post) {
            postFactory.upvotePost(post);
          };

        vm.downvotePost = function(post) {
            postFactory.downvotePost(post);
          };

        vm.deletePost = function(post) {
            postFactory.deletePost(post);
          };

    }]);
