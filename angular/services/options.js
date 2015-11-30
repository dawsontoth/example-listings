(function () {
	'use strict';

	angular
		.module('app')
		.factory('OptionsService', OptionsService);

	function OptionsService() {
		return {
			types: [
				'Unknown',
				'International',
				'National',
				'Regional',
				'State',
				'Local',
				'Corporate'
			],
			months: [
				'Unknown',
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			]
		};
	}

})();
