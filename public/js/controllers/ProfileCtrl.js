(function(){
	angular.module('ProfileCtrl', []).controller('ProfileController', 
		['$scope', 'auth', 'currentUserFactory', 'fileUploadFactory', function($scope, auth, currentUserFactory, fileUploadFactory) {

  		$scope.isLoggedIn = auth.isLoggedIn
  		$scope.user = currentUserFactory.user;

  		$scope.init_upload = function(){
  			fileUploadFactory.init_upload().then(function(data){
  				currentUserFactory.uploadProfilePicture(data);
          $scope.user.profilepicture = data;
  			}).catch(function(err){
			    	console.error('Augh, there was an error!', err.statusText);
			  });
  		}
	
	}]);
})();

