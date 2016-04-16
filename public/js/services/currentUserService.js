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

		return factory;
}])