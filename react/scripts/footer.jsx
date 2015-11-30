var FooterView = React.createClass({
	getInitialState: function() {
		return { now: new Date().toLocaleString() };
	},
	componentDidMount: function() {
		setInterval(this.updateTime, this.props.pollInterval);
	},
	updateTime: function() {
		this.setState(this.getInitialState());
	},
	render: function() {
		return (
			<div>
				Copyright © { this.state.now },&nbsp;
				<a href="http://www.foo.com/" target="_blank">My Listing Service, Inc.</a>&nbsp;
				All Rights Reserved.&nbsp;
					<span className="hidden-xs">
						Site Designed by: <a href="http://tothsolutions.com/" target="_blank">Toth Solutions, LLC.</a>
					</span>
			</div>
		);
	}
});

ReactDOM.render(
	<FooterView pollInterval={1000}/>,
	document.getElementById('footer')
);