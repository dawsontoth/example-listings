# To Get Started

Install NodeJS:

	https://nodejs.org/en/

Run the following from a terminal:

	npm install
	npm install -g bower
	bower install
	node server/app.js

The following should appear in your terminal:

	> node server/app.js
	angular listening at http://localhost:8080/
	react listening at http://localhost:8081/

## Optimizations

To compile React:

	npm install -g babel-cli
	cd react
	babel scripts --out-file compiled/app.js
	
Then update the index.html:

1. Remove these:
	<script src="vendor/browser.js"></script>
	<script type="text/babel" src="scripts/home.jsx"></script>
	<script type="text/babel" src="scripts/footer.jsx"></script>

2. Uncomment this:
	<script src="compiled/app.js"></script>
