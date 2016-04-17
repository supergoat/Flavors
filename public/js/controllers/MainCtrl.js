(function(){
	angular.module('MainCtrl', []).controller('MainController',
		['$scope', 'flavorsFactory', function($scope, flavorsFactory) {
  			$scope.flavors = flavorsFactory.flavors;

			$scope.addFlavor = function(){
				if(!$scope.title || $scope.title === '') { 
					$scope.error = 'Title is required';
					return; 
				}
				$scope.flavors.push({
					title: $scope.title, 
					upvotes: 0,
					comments: [
    					{author: 'Joe', body: 'Cool post!', upvotes: 0},
    					{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
					]
				});
				$scope.title = '';
			}

			$scope.incrementUpvotes = function(flavor){
				flavor.upvotes += 1;
			}
	}]);
})();