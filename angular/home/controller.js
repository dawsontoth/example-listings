(function() {
	'use strict';

	angular.module('app')
		.controller('HomeController', function($rootScope, $scope, ListingService, flash) {

			$scope.loading = true;
			ListingService.GetDetails(function(err, details) {
				$scope.loading = false;
				$scope.details = details;
			});

			$scope.newListingsLoading = true;
			ListingService.FindNewListings(function(err, results) {
				$scope.newListingsLoading = false;
				$scope.newListings = results;
			});

		});

})();
