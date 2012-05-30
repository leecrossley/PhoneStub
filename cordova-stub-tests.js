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
	console.log("All tests passed.");
	process.exit();
});