angular.module('currentUserService', []).factory('currentUserFactory', 
	['$http', 'auth', function($http, auth){
		var factory = {
			user: []
		};

		factory.getUser = function(){
			return $http.get('/api/current-user', {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(data){
				angular.copy(data, factory.user);
			});
		}

		factory.uploadProfilePicture = function(imageUrl){
	  		request = {
				profilePic: imageUrl 
			}
			return $http.post('/api/user/save-profile-pic', request, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			})
		}

		return factory;
}])