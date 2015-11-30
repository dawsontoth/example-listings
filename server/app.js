var express = require('express'),
	connect = require('connect'),
	compression = require('compression'),
	path = require('path'),
	_ = require('lodash'),
	appModulePath = require('app-module-path');

appModulePath.addPath(__dirname);
appModulePath.addPath(__dirname + '/..');

var listingAPI = require('api/listing');

var currentPort = process.env.PORT || 8080;
['angular', 'react'].forEach(function(frontEndBy) {

	var app = express();
	listingAPI.register(app);
	app.use(compression());
	app.use(express.static('static'));
	app.use('/bower_components', express.static('bower_components'));
	app.use(express.static(frontEndBy));

	app.use(connect.json());
	app.use(connect.urlencoded());
	app.use(require('lib/cors'));

	var server = app.listen(currentPort++, function() {
		console.log(frontEndBy + ' listening at http://localhost:' + server.address().port + '/');
	});

});