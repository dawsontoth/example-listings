'use strict';

angular
	.module('app')
	.factory('ListingService', Service);

function Service(lodash, HTTPService) {
	var _ = lodash,
		service = _.defaults({
			_singular: 'listing',
			_plural: 'listings'
		}, HTTPService);

	service.GetDetails = function(callback) {
		return this.get('listing', callback);
	};

	service.FindNewListings = function(callback) {
		return this.jsonp('http://www.alesha911.com/content/misc/TestHarness/JSONP/listings.ashx?callback=JSON_CALLBACK', callback);
	};

	return service;
}
