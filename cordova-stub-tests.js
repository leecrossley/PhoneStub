var Browser = require("zombie");
var assert = require("assert");

var browser = new Browser()

browser.on("error", function(error) {
	console.error(error);
});

browser.visit("file:///_src/Cordova-Stub/index.html", function() {
	assert.ok(browser.success);
	assert.equal(browser.text("title"), "Cordova Stub Tests");
});