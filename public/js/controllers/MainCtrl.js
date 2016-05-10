(function(){
	angular.module('MainCtrl', []).controller('MainController',
		['$scope', 'flavorsFactory', 'auth', function($scope, flavorsFactory, auth) {
  			$scope.isLoggedIn = auth.isLoggedIn
  			$scope.flavors = flavorsFactory.flavors;

			$scope.addFlavor = function(){
				if(!$scope.title || $scope.title === '') { 
					$scope.error = 'Title is required';
					return; 
				}
				flavorsFactory.create({
					title: $scope.title
				});
				$scope.title = '';
			};

			$scope.incrementUpvotes = function(flavor){
				flavorsFactory.upvote(flavor);
			}
	}]);
})();