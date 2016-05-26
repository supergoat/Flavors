// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'MainController',
			resolve: {
				flavorPromise: ['currentUserFactory', 'flavorsFactory', 'auth', function(currentUserFactory, flavorsFactory, auth){
					if(auth.isLoggedIn()){
						currentUserFactory.getUser();
						return flavorsFactory.getFlavors();
					}
				}]
			}		
		})

		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'AuthController',
			onEnter: ['$state', 'auth', function($state, auth){
				if(auth.isLoggedIn()){
					$state.go('home');
				}
			}]
		})

		.state('register', {
			url: '/register',
			templateUrl: 'views/register.html',
			controller: 'AuthController',
			onEnter: ['$state', 'auth', function($state, auth){
				if(auth.isLoggedIn()){
					$state.go('home');
				}
			}]
		})

		.state('flavors',{
			url: '/flavors/:id',
			templateUrl: 'views/flavors.html',
			controller: 'FlavorsController',
			resolve: {
				flavor: ['$stateParams', 'flavorsFactory', function($stateParams, flavorsFactory){
					return flavorsFactory.get($stateParams.id);
				}]
			}
		})

		.state('find-friends', {
			url: '/find-friends',
			templateUrl: 'views/find-friends.html',
			controller: 'FindFriendsController as friendsList',
			resolve: {
				friendsPromise: ['friendsFactory', function(friendsFactory){
					friendsFactory.getUsers(undefined);
					friendsFactory.getFriends();
					return friendsFactory.getFriendRequests();
				}]
			}
		})

		.state('friend-requests', {
			url:'/friend-requests',
			templateUrl: 'views/friend-requests.html',
			controller: 'FindFriendsController as friendsList'
		})

		.state('profile', {
			abstract: true,
			url: '/:userId',
			templateUrl: 'views/profile.html',
			controller: 'ProfileController',
			resolve: {
				userPromise: ['currentUserFactory', 'flavorsFactory', '$stateParams', function(currentUserFactory, flavorsFactory, $stateParams){
					flavorsFactory.getUserFlavors($stateParams.userId);
					return currentUserFactory.getUser();
				}]
			}
		})

		.state('profile.home', {
			url: '',
			templateUrl: 'views/profile.home.html',
			controller: 'ProfileController'
		})

		.state('profile.flavors', {
			url: '/flavors',
			templateUrl: 'views/profile.flavors.html',
			controller: 'ProfileController'
		})

		.state('profile.friends', {
			url: '/friends',
			templateUrl: 'views/profile.friends.html',
			controller: 'ProfileController',
			resolve: {
				userFriendsPromise: ['friendsFactory', function(friendsFactory){
					return friendsFactory.getFriends();
				}]
			}
		})

		.state('userprofile', {
			url: '/profile/:userId',
			templateUrl: 'views/userprofile.html',
			controller: 'UserProfileController',
			resolve: {
				userPromise: ['friendsFactory', 'flavorsFactory', '$stateParams', function(friendsFactory, flavorsFactory, $stateParams){
					flavorsFactory.getUserFlavors($stateParams.userId);
					return friendsFactory.getUsers($stateParams.userId);
				}]
			},
			onEnter: ['$stateParams','$state', 'auth', function($stateParams, $state, auth){
				if($stateParams.userId === auth.currentUserId()){
					$state.go('profile.home', {userId: auth.currentUserId()}, {reload: true});
				}
			}]
		})



    $urlRouterProvider.otherwise('/');

}]);