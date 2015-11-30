'use strict';

angular
	.module('app')
	.factory('HTTPService', HTTPService);

function HTTPService($http, lodash) {
	var _ = lodash;

	return {

		// Configuration.
		_root: 'http://localhost:8080/api/',

		// Public API.
		get: doGet,
		jsonp: doJSONP,
		post: doPost,
		put: doPut,
		delete: doDelete

	};

	function doGet(path, options, callback, errorMessage) {
		if (_.isFunction(options)) {
			callback = options;
			options = {};
		}
		if (!_.isFunction(callback)) {
			return $http.get(this._root + path, options);
		}
		return $http.get(this._root + path, options).then(handleSuccess.bind({ callback: callback }), handleError.bind({
			callback: callback,
			errorMessage: errorMessage
		}));
	}

	function doJSONP(path, options, callback, errorMessage) {
		if (_.isFunction(options)) {
			callback = options;
			options = {};
		}
		if (!_.isFunction(callback)) {
			return $http.jsonp(path, options);
		}
		return $http.jsonp(path, options).then(handleSuccess.bind({ callback: callback }), handleError.bind({
			callback: callback,
			errorMessage: errorMessage
		}));
	}

	function doPost(path, data, callback, errorMessage) {
		return $http.post(this._root + path, data).then(handleSuccess.bind({ callback: callback }), handleError.bind({
			callback: callback,
			errorMessage: errorMessage
		}));
	}

	function doPut(path, data, callback, errorMessage) {
		return $http.put(this._root + path, data).then(handleSuccess.bind({ callback: callback }), handleError.bind({
			callback: callback,
			errorMessage: errorMessage
		}));
	}

	function doDelete(path, callback, errorMessage) {
		return $http.delete(this._root + path).then(handleSuccess.bind({ callback: callback }), handleError.bind({
			callback: callback,
			errorMessage: errorMessage
		}));
	}

	function handleSuccess(evt) {
		var response = evt.data;
		// TODO: We could do additional processing or error handling on the data here.
		/*if (!response.success) {
			this.callback(response.message || 'Unexpected response from the server.');
		}
		else {
			this.callback(null, response);
		}*/
		// For now, though, assume we got a success:
		this.callback(null, response);
	}

	function handleError(error) {
		console.log(error);
		this.callback(this.errorMessage);
	}
}
