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
	
	var stub = browser.window.cordovaStub;
	var device = browser.window.device;
	var navigator = browser.window.navigator;
	var localFileSystem = browser.window.LocalFileSystem;
	
	// Device ready test
	var deviceReady;
	browser.document.addEventListener("deviceready", function() {deviceReady = true;}, false);
	browser.fire("load", browser.window);
	assert.equal(deviceReady, true);
	
	// Device stub tests
	assert.equal(device.name, "Node.js jsDom");
	assert.equal(device.cordova, "1.6.1 Stub");
	assert.equal(device.platform, "darwin");
	stub.deviceStub.setPlatform("iphone");
	assert.equal(device.platform, "iphone");
	assert.equal(device.uuid.length, 36);
	assert.equal(device.version, "v0.6.18");
	
	// Connection stub tests
	assert.equal(navigator.network.connection.type, "wifi");
	stub.connectionStub.setType("CELL_3G");
	assert.equal(navigator.network.connection.type, "3g");
	
	// File stub tests
	assert.equal(browser.window.LocalFileSystem.TEMPORARY, 0);
	assert.equal(browser.window.LocalFileSystem.PERSISTENT, 1);
	
	browser.window.requestFileSystem(localFileSystem.PERSISTENT, 0, gotFS, fail);
	
	console.log("All tests passed");
	process.exit();
});

    function gotFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        readDataUrl(file);
        readAsText(file);
    }

    function readDataUrl(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as data URL");
            console.log(evt.target.result);
        };
        reader.readAsDataURL(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
            console.log(evt.target.result);
        };
        reader.readAsText(file);
    }

    function fail(evt) {
        console.log(evt.target.error.code);
    }
