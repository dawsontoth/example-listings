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

To compile React:

	npm install --global babel-cli
	cd react
	babel app --out-file compiled/app.js