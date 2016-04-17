(function(){
	angular.module('MainCtrl', []).controller('MainController',
		['$scope', 'flavorsFactory', function($scope, flavorsFactory) {
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