angular.module('flavorsService', []).factory('flavorsFactory', 
	['$http', 'auth', function($http, auth){
		var factory = {
			flavors: []
		};

		factory.getUserFlavors = function(userId, posts){
			if(userId === undefined) {
				return;
			}
			return $http.get('/api/flavors/user/' + userId + '?posts=' + posts).success(function(data){
				angular.copy(data, factory.flavors);
			});
		};

		factory.getFlavors = function(){
			var userId = auth.currentUserId();
			if(userId === undefined) {
				return;
			}
			return $http.get('/api/home/flavors/user/' + userId).success(function(data){
				angular.copy(data, factory.flavors);
			});
		};

		factory.get = function(id){
			return $http.get('/api/flavors/' + id).then(function(res){
				return res.data;
			})
		}

		factory.create = function(user, flavor){
			return $http.post('/api/' + user + '/flavors', flavor, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(data){
				factory.flavors.push(data);
			})
		}

		factory.upvote = function(flavor){
			return $http.put('/api/flavors/' + flavor._id + '/upvote', null, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(data){
				flavor.upvotes = data.upvotes;
				flavor.upvotesBy = data.upvotesBy;
			});
		}

		factory.addComment = function(userId, flavorId, comment){
			return $http.post('/api/' + userId + '/flavors/' + flavorId + '/comments', comment, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			});
		};

		factory.upvoteComment = function(flavor, comment){
			return $http.put('/api/flavors/' + flavor._id + '/comments/' + comment._id + '/upvote', null, {
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(data){
				comment.upvotes = data.upvotes;
				comment.upvotesBy = data.upvotesBy;
			});
		};

		return factory;
}])