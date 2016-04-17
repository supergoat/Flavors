angular.module('flavorsService', []).factory('flavorsFactory', 
	['$http', 'auth', function($http, auth){
		var factory = {
			flavors: []
		};

		return factory;
}])