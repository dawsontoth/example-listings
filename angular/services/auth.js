(function () {
	'use strict';
	// Note: If we had a defined API for user authentication, we could access it like this:

	angular
		.module('app')
		.factory('AuthService', AuthService);

	function AuthService(lodash, $http, $cookieStore, $rootScope, Base64Service, HTTPService) {
		var _ = lodash;
		return _.defaults({
			Login: Login,
			ChangePassword: ChangePassword,
			SetCredentials: SetCredentials,
			ClearCredentials: ClearCredentials
		}, HTTPService);

		function Login(email, password, callback) {
			this.post('user/login', {
				email: email,
				password: password
			}, callback, 'Unable to sign in with those credentials.');
		}

		function ChangePassword(password, callback) {
			this.put('user/password', {
				password: password
			}, callback, 'Changing your password failed.');
		}

		function SetCredentials(email, password) {
			var authdata = Base64Service.encode(email + ':' + password);
			$http.defaults.headers.common.Authorization = 'Basic ' + authdata;
			$cookieStore.put('globals', $rootScope.globals = {
				currentUser: {
					email: email,
					authdata: authdata
				}
			});
		}

		function ClearCredentials() {
			$rootScope.globals = {};
			$cookieStore.remove('globals');
			delete $http.defaults.headers.common.Authorization;
		}
	}

})();
