var FooterView = React.createClass({
	displayName: "FooterView",

	/*
  Lifecycle.
  */
	getInitialState: function () {
		return { now: new Date().toLocaleString() };
	},
	componentDidMount: function () {
		setInterval(this.updateTime, this.props.pollInterval);
	},
	render: function () {
		return React.createElement(
			"div",
			null,
			"Copyright © ",
			this.state.now,
			", ",
			React.createElement(
				"a",
				{ href: "http://www.foo.com/", target: "_blank" },
				"My Listing Service, Inc."
			),
			"  All Rights Reserved. ",
			React.createElement(
				"span",
				{ className: "hidden-xs" },
				"Site Designed by: ",
				React.createElement(
					"a",
					{ href: "http://tothsolutions.com/", target: "_blank" },
					"Toth Solutions, LLC."
				)
			),
			"  Rendered by React"
		);
	},
	/*
  Class Specific Methods.
  */
	updateTime: function () {
		this.setState(this.getInitialState());
	}
});

ReactDOM.render(React.createElement(FooterView, { pollInterval: 1000 }), document.getElementById('footer'));
var LoadingView = React.createClass({
	displayName: "LoadingView",

	/*
  Lifecycle.
  */
	render: function () {
		return React.createElement(
			"div",
			{ className: "loading" },
			React.createElement("img", {
				src: "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" })
		);
	}
}),
    NewListingsView = React.createClass({
	displayName: "NewListingsView",

	/*
  Lifecycle.
  */
	componentDidMount: function () {
		this.loadNewListings();
	},
	getInitialState: function () {
		return {};
	},
	render: function () {
		if (this.state.results === undefined) {
			return React.createElement(LoadingView, null);
		}
		var listings = this.state.results.map(function (result, index, array) {
			var item = React.createElement(
				"a",
				{ onClick: showNYI, className: "new_listing", href: '/#/listing/' + index },
				React.createElement("span", { className: "glyphicon glyphicon-arrow-right pull-right" }),
				React.createElement("span", { className: 'sprite sprite-status-' + result.StatusId }),
				" ",
				result.ListingAddress
			);
			if (index === array.length - 1) {
				return React.createElement(
					"div",
					{ key: index },
					item
				);
			}
			return React.createElement(
				"div",
				{ key: index },
				item,
				React.createElement("div", { className: "sprite sprite-dash-horizontal" })
			);
		});
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h3",
				{ className: "collapses", "data-toggle": "collapse", "data-target": "#newListings" },
				React.createElement("span", { className: "glyphicon" }),
				" NEW LISTINGS in my area ",
				React.createElement(
					"span",
					{
						className: "badge" },
					this.state.results.length
				)
			),
			React.createElement(
				"div",
				{ className: "collapse in", id: "newListings" },
				listings
			)
		);
	},
	/*
  Class Specific Methods.
  */
	loadNewListings: function () {
		$.ajax({
			url: 'http://www.alesha911.com/content/misc/TestHarness/JSONP/listings.ashx',
			dataType: 'jsonp',
			jsonp: 'callback',
			cache: false,
			success: this.newListingsLoaded
		});
	},
	newListingsLoaded: function (results) {
		this.setState({ results: results });
	}
}),
    HomeView = React.createClass({
	displayName: "HomeView",

	/*
  Lifecycle.
  */
	componentDidMount: function () {
		this.loadDetailsFromServer();
	},
	getInitialState: function () {
		return {};
	},
	render: function () {
		if (this.state.details === undefined) {
			return React.createElement(LoadingView, null);
		}
		return React.createElement(
			"div",
			{ className: "container listing-details" },
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-md-6" },
					React.createElement(
						"h3",
						{ className: "collapses", "data-toggle": "collapse", "data-target": "#details" },
						React.createElement("span", { className: "glyphicon" }),
						" Neighborhood"
					),
					React.createElement(
						"div",
						{ className: "collapse in", id: "details" },
						React.createElement(
							"p",
							{ className: "text-muted" },
							this.state.details.description
						),
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"dl",
								{ className: "col-md-6" },
								React.createElement(
									"dt",
									null,
									"Avg estimated value"
								),
								React.createElement(
									"dd",
									null,
									"$",
									this.state.details.value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
								)
							),
							React.createElement(
								"dl",
								{ className: "col-md-6" },
								React.createElement(
									"dt",
									null,
									"Change over last month"
								),
								React.createElement(
									"dd",
									{ className: this.state.details.change_over_last_month >= 0 ? 'text-success' : 'text-danger' },
									React.createElement("span", {
										className: 'glyphicon glyphicon-arrow-' + (this.state.details.change_over_last_month >= 0 ? 'up' : 'down') }),
									" ",
									this.state.details.change_over_last_month.toFixed(2),
									"%"
								)
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "col-md-6" },
					React.createElement(NewListingsView, null)
				)
			),
			React.createElement(
				"div",
				{ className: "row well well-lg" },
				"You can never truly know a property until you see it in person.",
				React.createElement("br", null),
				React.createElement("br", null),
				React.createElement(
					"a",
					{ onClick: showNYI, href: "/#/nyi", className: "btn btn-primary" },
					"Contact a Realtor Today"
				)
			)
		);
	},
	/*
  Class Specific Methods.
  */
	loadDetailsFromServer: function () {
		$.ajax({
			url: 'api/listing',
			dataType: 'json',
			json: true,
			cache: false,
			success: this.detailsLoaded
		});
	},
	detailsLoaded: function (details) {
		this.setState({ details: details });
	}
});

function showNYI(e) {
	e.preventDefault();
	ReactDOM.render(React.createElement(
		"div",
		{ className: "flash-message alert alert-danger", onClick: hideAlert },
		React.createElement(
			"strong",
			{ className: "alert-heading" },
			"Error!"
		),
		React.createElement(
			"span",
			{ className: "alert-message" },
			"This particular feature has not yet been implemented."
		)
	), document.getElementById('alert'));
	setTimeout(hideAlert, 6000);
	return false;
}

function hideAlert() {
	$('.flash-message').remove();
}

ReactDOM.render(React.createElement(HomeView, null), document.getElementById('main-view'));
