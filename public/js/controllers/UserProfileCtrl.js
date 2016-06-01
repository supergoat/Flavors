(function(){
	angular.module('UserProfileCtrl', []).controller('UserProfileController', 
		['$scope', 'auth', 'friendsFactory', 'fileUploadFactory', 'flavorsFactory', function($scope, auth, friendsFactory, fileUploadFactory, flavorsFactory) {

  		$scope.isLoggedIn = auth.isLoggedIn
  		$scope.user = friendsFactory.user;
      $scope.friends = friendsFactory.friends;
      $scope.flavors = flavorsFactory.flavors;
      $scope.flavorShowComments = 1;
      $scope.state = 'userprofile';
      
      var currentUserId = auth.currentUserId();

      $scope.incrementUpvotes = function(flavor){
        flavorsFactory.upvote(flavor);
      }
      
      $scope.addComment = function(flavor){
        if(!this.body || this.body === '') {
          return; 
        }
        flavorsFactory.addComment(currentUserId, flavor._id,{
          body: this.body
        }).success(function(comment){
          flavor.comments.push(comment);
        });
        this.body = '';
      };

      $scope.incrementCommentUpvotes = function(flavor, comment){
        flavorsFactory.upvoteComment(flavor, comment);
      }
	
	}]);
})();

