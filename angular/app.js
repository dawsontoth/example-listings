'use strict';

angular
	.module('app', [
		'ngRoute',
		'ngLodash',
		'angular-flash.service',
		'angular-flash.flash-alert-directive'
	])
	.config(function($routeProvider, flashProvider) {
		flashProvider.errorClassnames.push('alert-danger');
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				templateUrl: 'home/view.html',
				controllerAs: 'vm'
			})

			.when('/listing/:address', {
				controller: 'ListingController',
				templateUrl: 'listing/view.html',
				controllerAs: 'vm'
			})

			.otherwise({ redirectTo: '/' });
	})
	.run(function($rootScope, $interval) {

		// TODO: Note: We could manage user logins here:
		// Keep user logged in after page refresh.
		//$rootScope.globals = $cookieStore.get('globals') || {};
		//if ($rootScope.globals.currentUser) {
		//	$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		//}

		//$rootScope.$on('$locationChangeStart', function(event, next, current) {
		//	// Redirect to login page if not logged in and trying to access a restricted page.
		//	var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
		//	var loggedIn = $rootScope.globals.currentUser;
		//	if (restrictedPage && !loggedIn) {
		//		$location.path('/login');
		//	}
		//});


		// TODO: We can update the root scope here, which is used in the main template.
		$rootScope.now = new Date();

		// Now if we wanted to update the time, we might expect the following to work...
		//setInterval(function() {
		//	$rootScope.now = new Date();
		//}, 1000);

		// But it won't, because the scope doesn't know it was updated unless we manually tell it:
		//setInterval(function() {
		//	$rootScope.$apply(function() {
		//		$rootScope.now = new Date();
		//	});
		//}, 1000);

		// Alternatively, we can use the built in service $interval, which updates the scope for us:
		//$interval(function() {
		//	$rootScope.now = new Date();
		//}, 1000);
	});
