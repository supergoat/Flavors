(function(){
	angular.module('MainCtrl', []).controller('MainController',
		['$scope', 'flavorsFactory', 'fileUploadFactory', 'auth', function($scope, flavorsFactory, fileUploadFactory, auth) {
  			$scope.isLoggedIn = auth.isLoggedIn
  			$scope.flavors = flavorsFactory.flavors;

			$scope.addFlavor = function(){
				if(!$scope.title || $scope.title === '') { 
					$scope.error = 'Title is required';
					return; 
				} else if ($scope.temporaryPicture || $scope.temporaryPicture !== '') {
					flavorsFactory.create({
						title: $scope.title,
						picture: $scope.temporaryPicture
					});
					$scope.title = '';
					$scope.temporaryPicture = '';
				} else {
					flavorsFactory.create({
						title: $scope.title
					});
					$scope.title = '';
				}
				
			};

			$scope.incrementUpvotes = function(flavor){
				flavorsFactory.upvote(flavor);
			}


  		$scope.init_upload = function(){
  			fileUploadFactory.init_upload().then(function(data){
          $scope.temporaryPicture = data;
  			}).catch(function(err){
			   	console.error('Augh, there was an error!', err.statusText);
				});
  		}

	}]);
})();