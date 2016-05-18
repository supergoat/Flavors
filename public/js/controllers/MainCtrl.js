(function(){
	angular.module('MainCtrl', []).controller('MainController',
		['$scope', 'flavorsFactory', 'fileUploadFactory', 'auth', function($scope, flavorsFactory, fileUploadFactory, auth) {
  			$scope.isLoggedIn = auth.isLoggedIn
  			$scope.flavors = flavorsFactory.flavors;

			$scope.addFlavor = function(){
				fileUploadFactory.init_upload().then(function(data){
          var flavorImage = data;
	        if(!$scope.title || $scope.title === '') { 
						$scope.error = 'Title is required';
						return; 
					} else if (flavorImage && flavorImage !== '') {
						flavorsFactory.create({
							title: $scope.title,
							picture: flavorImage
						});
						$scope.title = '';
						$scope.temporaryPicture = '';
					} else {
						flavorsFactory.create({
							title: $scope.title
						});
						$scope.title = '';
					}
  			}).catch(function(err){
			   	console.error('Augh, there was an error!', err.statusText);
				});

				
			};

			$scope.incrementUpvotes = function(flavor){
				flavorsFactory.upvote(flavor);
			}

  		$scope.readURL = function(){
  			var files = document.getElementById("file_input").files;
			  var file = files[0];

  			fileUploadFactory.readURL(files, file).then(function(data){
  				$scope.temporaryPicture = data;
  				$scope.$apply();
  			});
  		}


	}]);
})();