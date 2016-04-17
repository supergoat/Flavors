(function(){
	angular.module('FlavorsCtrl', []).controller('FlavorsController',
		['$scope','flavorsFactory','flavor', function($scope, flavorsFactory, flavor) {
 		
 			$scope.flavor = flavor;

 			$scope.addComment = function(){
 				if($scope.body === '') {
					$scope.error = 'Comment cannot be blank';
					return; 
 				}
 				flavorsFactory.addComment(flavor._id,{
 					body: $scope.body,
 					author: 'user',
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