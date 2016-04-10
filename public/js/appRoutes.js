// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/home.html',
			controller: 'MainController',
		})
    $urlRouterProvider.otherwise('home');

}]);