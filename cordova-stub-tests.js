var Browser = require("zombie");
var assert = require("assert");

var browser = new Browser()

Browser.debug = true;

browser.on("error", function(error) {
	console.error(error);
});

browser.visit("file:///_src/Cordova-Stub/index.html", function() {
	assert.ok(browser.success);
	assert.equal(browser.text("title"), "Cordova Stub Tests");
});