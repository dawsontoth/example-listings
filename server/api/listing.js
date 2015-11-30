exports.register = function(app) {
	app.get('/api/listing', function(req, res, next) {
		res.json({
			description: 'Lorem ipsum has an sale efficiendi. Harum affert inimicus ne eam, ex est impedit pertinax omittantur, ius ex omnium aliquid quarendum. Pro iudico atomorum reformidans ei, ne altera efficiantur eos. Nostrum pertinax quaerendum ad has, no pro ridens mnesarchum, et sea mucius feugiat adolescens. Cum ei splendide definitionem, qui ei alterum gubergren interesset, facer liber constituto eu quo. Ad utinam vocibus',
			value: 434406,
			change_over_last_month: Math.floor((Math.random() * 10 - 5) * 100) / 100
		});
	});
};