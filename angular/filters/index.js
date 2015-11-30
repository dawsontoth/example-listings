'use strict';

angular.module('app')
	.filter('ucFirst', function() {
		return function(input, arg) {
			return input.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
		};
	})
	.filter('encodeURIComponent', function() {
		return window.encodeURIComponent;
	})
	.filter('fromNow', function() {
		return function(input, arg) {
			if (!input) {
				return 'Never';
			}
			return moment(input).fromNow();
		};
	});