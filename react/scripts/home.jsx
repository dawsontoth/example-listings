var LoadingView = React.createClass({
		/*
		 Lifecycle.
		 */
		render: function() {
			return (
				<div className="loading">
					<img
						src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
				</div>
			);
		}
	}),

	NewListingsView = React.createClass({
		/*
		 Lifecycle.
		 */
		componentDidMount: function() {
			this.loadNewListings();
		},
		getInitialState: function() {
			return {};
		},
		render: function() {
			if (this.state.results === undefined) {
				return (
					<LoadingView/>
				);
			}
			var listings = this.state.results.map(function(result, index, array) {
				var item = <a onClick={showNYI} className="new_listing" href={ '/#/listing/' + index }>
					<span className="glyphicon glyphicon-arrow-right pull-right"/>
					<span className={ 'sprite sprite-status-' + result.StatusId }/> { result.ListingAddress }
				</a>;
				if (index === array.length - 1) {
					return (
						<div key={ index }>
							{ item }
						</div>
					);
				}
				return (
					<div key={ index }>
						{ item }
						<div className="sprite sprite-dash-horizontal"></div>
					</div>
				);
			});
			return (
				<div>
					<h3 className="collapses" data-toggle="collapse" data-target="#newListings">
						<span className="glyphicon"/> NEW LISTINGS in my area <span
						className="badge">{ this.state.results.length }</span>
					</h3>
					<div className="collapse in" id="newListings">
						{ listings }
					</div>
				</div>
			);
		},
		/*
		 Class Specific Methods.
		 */
		loadNewListings: function() {
			$.ajax({
				url: 'http://www.alesha911.com/content/misc/TestHarness/JSONP/listings.ashx',
				dataType: 'jsonp',
				jsonp: 'callback',
				cache: false,
				success: this.newListingsLoaded
			})
		},
		newListingsLoaded: function(results) {
			this.setState({ results: results });
		}
	}),

	HomeView = React.createClass({
		/*
		 Lifecycle.
		 */
		componentDidMount: function() {
			this.loadDetailsFromServer();
		},
		getInitialState: function() {
			return {};
		},
		render: function() {
			if (this.state.details === undefined) {
				return (
					<LoadingView/>
				);
			}
			return (
				<div className="container listing-details">
					<div className="row">

						<div className="col-md-6">
							<h3 className="collapses" data-toggle="collapse" data-target="#details">
								<span className="glyphicon"/> Neighborhood
							</h3>
							<div className="collapse in" id="details">
								<p className="text-muted">
									{ this.state.details.description }
								</p>

								<div className="row">
									<dl className="col-md-6">
										<dt>Avg estimated value</dt>
										<dd>
											${ this.state.details.value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') }</dd>
									</dl>
									<dl className="col-md-6">
										<dt>Change over last month</dt>
										<dd className={ this.state.details.change_over_last_month >= 0 ? 'text-success' : 'text-danger' }>
											<span
												className={ 'glyphicon glyphicon-arrow-' + (this.state.details.change_over_last_month >= 0 ? 'up' : 'down') }/> { this.state.details.change_over_last_month.toFixed(2) }%
										</dd>
									</dl>
								</div>

							</div>
						</div>

						<div className="col-md-6">
							<NewListingsView/>
						</div>
					</div>
					<div className="row well well-lg">
						You can never truly know a property until you see it in person.<br/><br/>
						<a onClick={showNYI} href="/#/nyi" className="btn btn-primary">Contact a Realtor Today</a>
					</div>

				</div>
			);
		},
		/*
		 Class Specific Methods.
		 */
		loadDetailsFromServer: function() {
			$.ajax({
				url: 'api/listing',
				dataType: 'json',
				json: true,
				cache: false,
				success: this.detailsLoaded
			})
		},
		detailsLoaded: function(details) {
			this.setState({ details: details });
		}
	});

function showNYI(e) {
	e.preventDefault();
	ReactDOM.render(
		<div className="flash-message alert alert-danger" onClick={hideAlert}>
			<strong className="alert-heading">Error!</strong>
			<span className="alert-message">This particular feature has not yet been implemented.</span>
		</div>,
		document.getElementById('alert')
	);
	setTimeout(hideAlert, 6000);
	return false;
}

function hideAlert() {
	$('.flash-message').remove();
}

ReactDOM.render(
	<HomeView/>,
	document.getElementById('main-view')
);