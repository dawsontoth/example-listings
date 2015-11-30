'use strict';

angular.module('app')
	.directive('ngLoading', function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/directives/loading.html'
		};
	})
	.directive('ngFlash', function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '/directives/flash.html'
		};
	})
	.directive('ngConfirmClick', function() {
		return {
			priority: -1,
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('click', function(e) {
					var message = attrs.ngConfirmClick;
					if (message && !confirm(message)) {
						e.stopImmediatePropagation();
						e.preventDefault();
					}
				});
			}
		}
	})
	.directive('ngClickToHide', function() {
		return {
			priority: -1,
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('click', function(e) {
					element.removeClass('alert-error alert-success alert-danger in')
				});
			}
		}
	})
	.directive('ngNyi', function(flash) {
		return {
			priority: -1,
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('click', function(e) {
					flash.error = 'This feature has not yet been implemented!';
					e.stopImmediatePropagation();
					e.preventDefault();
				});
			}
		}
	});
