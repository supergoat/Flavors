// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // home page
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

    $locationProvider.html5Mode(true);

}]);