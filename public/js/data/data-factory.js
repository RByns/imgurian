angular.module('imgurian')
    .factory('dataFactory', ['$rootScope', '$http', '$state', 'auth', function ($rootScope, $http, $state, auth) {

        var dataFactory = {
            getPosts: getPosts,
            loadPosts: loadPosts,
            upvotePost: upvotePost,
            downvotePost: downvotePost,
            deletePost: deletePost,
            addPost: addPost,
          };

        return dataFactory;

        //GET

        function getPosts() {
            return $http.get('/posts')
                .then(function (res) {
                    return res.data;
                })
                .catch(printError);
        }

      function loadPosts(postsCount, MAX_LOAD_POST_COUNT, sortField, order) {
          return $http.get('/load-posts/from/' + postsCount + '/limit-to/' + MAX_LOAD_POST_COUNT + '/sort-by/' + sortField + '/' + order, {
              headers: {Authorization: 'Bearer ' + auth.getToken()}
          })
          .catch(printError);
      }

        //POST

        function addPost(post) {
            return $http.post('/posts/', post, {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            });
        }

        //DELETE

        function deletePost(post){
            return $http.delete('/post/' + post._id, {
              headers: {Authorization: 'Bearer '+ auth.getToken()}
            }).success(function(){
              posts.splice(posts.indexOf(post), 1);
            });
          }

        //PUT

        function upvotePost(post) {
            return $http.put('/post/' + post._id + '/upvote', null, {
                headers: {Authorization: 'Bearer '+auth.getToken()}
              }).success(function(data){
                post.upvotes += 1;
              });
            }

        function downvotePost(post) {
          return $http.put('/post/' + post._id + '/downvote', null, {
              headers: {Authorization: 'Bearer '+auth.getToken()}
            }).success(function(data){
                post.upvotes -= 1;
              });
        }

        function printError(error) {
            console.log("%c " + error, "color: #ff0000");
        }
    }]);
