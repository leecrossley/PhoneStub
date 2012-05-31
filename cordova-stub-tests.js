/*global require, console, process */
/*jslint sloppy: true */

var Zombie = require("zombie");
var assert = require("assert");
var server = require("realsimpleserver");

server.spinUp(8125);

var browser = new Zombie();

browser.on("error", function (error) {
	console.error(error);
});

browser.visit("http://localhost:8125/", function () {
	assert.ok(browser.success);
	assert.equal(browser.text("title"), "Cordova Stub Tests");
	browser.document.addEventListener("deviceready", runTests, false);
	browser.fire("load", browser.window);
});

function runTests() {
	var stub = browser.window.cordovaStub;
	var device = browser.window.device;
	var navigator = browser.window.navigator;
	
	// Device stub tests
	assert.equal(device.name, "Node.js jsDom");
	assert.equal(device.cordova, "1.6.1 Stub");
	assert.equal(device.platform, "darwin");
	assert.equal(device.uuid.length, 36);
	assert.equal(device.version, "v0.6.18");
	
	// Connection stub tests
	assert.equal(navigator.network.connection.type, "wifi");
	stub.connectionStub.setType("CELL_3G");
	assert.equal(navigator.network.connection.type, "3g");
	
	console.log("All tests passed");
	process.exit();
}