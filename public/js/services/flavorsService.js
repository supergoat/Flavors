angular.module('flavorsService', []).factory('flavorsFactory', 
	['$http', 'auth', function($http, auth){
		var factory = {
			flavors: []
		};

		factory.getAll = function(){
			return $http.get('/api/flavors').success(function(data){
				angular.copy(data, factory.flavors);
			});
		};

		factory.get = function(id){
			return $http.get('/api/flavors/' + id).then(function(res){
				return res.data;
			})
		}

		factory.create = function(flavor){
			return $http.post('/api/flavors', flavor, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(data){
				factory.flavors.push(data);
			})
		}

		factory.upvote = function(flavor){
			return $http.put('/api/flavors/' + flavor._id + '/upvote', null, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(data){
				flavor.upvotes += 1;
			});
		}

		factory.addComment = function(id, comment){
			return $http.post('/api/flavors/' + id + '/comments', comment, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			});
		};

		factory.upvoteComment = function(flavor, comment){
			return $http.put('/api/flavors/' + flavor._id + '/comments/' + comment._id + '/upvote', null, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(data){
				comment.upvotes += 1;
			});
		};

		return factory;
}])