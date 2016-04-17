(function(){
	angular.module('FlavorsCtrl', []).controller('FlavorsController',
		['$scope', '$stateParams','flavorsFactory', function($scope, $stateParams, flavorsFactory) {
 		
 			$scope.flavor = flavorsFactory.flavors[$stateParams.id]

 			$scope.addComment = function(){
 				if($scope.body === '') {
					$scope.error = 'Comment cannot be blank';
					return; 
 				}
 				$scope.flavor.comments.push({
 					body: $scope.body,
 					author: 'user',
 					upvotes: 0
 				});
 				$scope.body = '';
 			}

 			$scope.incrementUpvotes = function(comment){
				comment.upvotes += 1;
			}
	}]);
})();