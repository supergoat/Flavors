(function(){
	angular.module('FlavorsCtrl', []).controller('FlavorsController',
		['$scope','flavorsFactory','flavor', 'auth', function($scope, flavorsFactory, flavor, auth) {
 			$scope.isLoggedIn = auth.isLoggedIn
 			$scope.flavor = flavor;

 			$scope.addComment = function(){
 				if(!$scope.body || $scope.body === '') {
					$scope.error = 'Comment cannot be blank';
					return; 
 				}
 				$scope.error = '';
 				flavorsFactory.addComment(flavor._id,{
 					body: $scope.body
 				}).success(function(comment){
 					$scope.flavor.comments.push(comment);
 				});
 				$scope.body = '';
 			};

 			$scope.incrementUpvotes = function(comment){
				flavorsFactory.upvoteComment(flavor, comment);
			}
	}]);
})();