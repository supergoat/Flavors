(function(){
	angular.module('ProfileCtrl', []).controller('ProfileController', 
		['$scope', 'auth', 'currentUserFactory', 'fileUploadFactory', 'flavorsFactory', function($scope, auth, currentUserFactory, fileUploadFactory, flavorsFactory) {

  		$scope.isLoggedIn = auth.isLoggedIn
  		$scope.user = currentUserFactory.user;
      $scope.flavors = flavorsFactory.flavors;

  		$scope.init_upload = function(){
  			fileUploadFactory.init_upload().then(function(data){
  				currentUserFactory.uploadProfilePicture(data);
          $scope.user.profilepicture = data;
          $scope.user.temporaryProfile = '';
          $scope.$apply();
  			}).catch(function(err){
			    	console.error('Augh, there was an error!', err.statusText);
			  });
  		}

      $scope.removePhoto = function(){
        $scope.user.temporaryProfile = '';
        document.getElementById("file_input").value = '';
      }

      $scope.readURL = function(){
        var files = document.getElementById("file_input").files;
        var file = files[0];

        fileUploadFactory.readURL(files, file).then(function(data){
          $scope.user.temporaryProfile = data;
          $scope.$apply();
        }).catch(function(err){
            console.error('Augh, there was an error!', err.statusText);
        });
      }
	
	}]);
})();

