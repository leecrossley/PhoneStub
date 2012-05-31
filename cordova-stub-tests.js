/*global require, console, process */
/*jslint sloppy: true */

var Zombie = require("zombie");
var assert = require("assert");
var server = require("realsimpleserver");

server.spinUp(8125);

var browser = new Zombie();

//browser.debug = true;

browser.on("error", function (error) {
	console.error(error);
});

browser.visit("http://localhost:8125/", function () {
	browser.document.addEventListener("deviceready", runTests, false);
	browser.fire("load", browser.window);
});

function runTests() {
	assert.ok(browser.success);
	assert.equal(browser.text("title"), "Cordova Stub Tests");
	
	// Device stub tests
	assert.equal(browser.window.device.name, "Node.js jsDom");
	assert.equal(browser.window.device.cordova, "1.6.1 Stub");
	assert.equal(browser.window.device.platform, "darwin");
	assert.equal(browser.window.device.uuid.length, 36);
	assert.equal(browser.window.device.version, "v0.6.18");
	
	console.log("All tests passed");
	process.exit();
}