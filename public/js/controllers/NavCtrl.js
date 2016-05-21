(function(){
	angular.module('NavCtrl', []).controller('NavController',
		['$scope', 'auth',function($scope, auth) {
			$scope.isLoggedIn = auth.isLoggedIn;
			$scope.currentUser = auth.currentUser;
			$scope.currentUserId = auth.currentUserId;
			$scope.logOut = auth.logOut;
	}]);
})();