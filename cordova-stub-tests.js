var zombie = require("zombie");
var assert = require("assert");

var browser = new Browser();

Browser.debug = true;

browser.on("error", function(error) {
	console.error(error);
});

browser.visit("http://localhost:3000/", function() {
	//assert.ok(browser.success);
	//assert.equal(browser.text("title"), "Cordova Stub Tests");
	console.log(browser.text("title"));
});