/*jslint bitwise: true */
/*global window, document, navigator, setTimeout, jsdom */

if (typeof (window) === "undefined") {
	if (typeof (jsdom) === "undefined") {
		var window = {};
	} else {
		var window = jsdom.jsdom().createWindow();
	}
}

window.cordova = {};

var cordovaStub = (function () {
	"use strict";
	var cordovaStub = {};

	window.cordova.m_addEventListener = document.addEventListener;

	document.addEventListener = function (e, handler, capture) {
		if (e.toLowerCase() === "deviceready") {
			var loaded;
			if ((typeof (handler) === "undefined") || (typeof (handler) !== "function")) {
				return;
			}
			if (document.addEventListener) {
				loaded = function () {
					document.removeEventListener("DOMContentLoaded", loaded, false);
					handler();
				};
				document.addEventListener("DOMContentLoaded", loaded, false);
				window.addEventListener("load", loaded, false);
			} else if (document.attachEvent) {
				loaded = function () {
					if (document.readyState === "complete") {
						document.detachEvent("onreadystatechange", loaded);
						handler();
					}
				};
				document.attachEvent("onreadystatechange", loaded);
				window.attachEvent("onload", loaded);
			} else if (document.readyState === "complete") {
				setTimeout(handler, 1);
			}
		} else {
			window.cordova.m_addEventListener.call(document, e, handler, capture);
		}
	};

	cordovaStub.deviceStub = (function () {
		var deviceStub = {};

		function number(length) {
			var result = "", i = 0;
			while (i < length) {
				result += (((1 + Math.random()) * 0x10) | 0).toString(15).substring(1);
				i = i + 1;
			}
			return result;
		}

		function generateUUID() {
			return (number(8) + "-" + number(4) + "-" + number(4)
				+ "-" + number(4) + "-" + number(12));
		}

		window.device = {
			name: navigator.appName,
			cordova: "1.6.1 Stub",
			platform: navigator.platform,
			uuid: generateUUID(),
			version: navigator.appVersion
		};
		
		deviceStub.setPlatform = function (platform) {
			window.device.platform = platform;
		};

		return deviceStub;
	}());

	cordovaStub.connectionStub = (function () {
		var connectionStub = {},
			types = {
				UNKNOWN: "unknown",
				ETHERNET: "ethernet",
				WIFI: "wifi",
				CELL_2G: "2g",
				CELL_3G: "3g",
				CELL_4G: "4g",
				NONE: "none"
			};

		navigator.network = {
			connection : {
				type : ""
			}
		};

		connectionStub.setType = function (type) {
			navigator.network.connection.type = types[type];
		};

		connectionStub.setType("WIFI");

		return connectionStub;
	}());

	cordovaStub.fileStub = (function () {
		var fileStub = {},
			temporaryFiles = [],
			persistedFiles = [];

		window.LocalFileSystem = {
			TEMPORARY: 0,
			PERSISTENT: 1
		};
		
		var getFile = function (name, options, successCb, errorCb) {
			
		};
		
		var fileSystem = {
			root : {
				getFile : getFile
			}
		};
		
		window.requestFileSystem = function (localFileSystem, size, successCb, errorCb) {
			if (typeof (errorCb) !== "function") {
				errorCb = function(err) {
					console.log("File system error: " + err);
				};
			}
			if (typeof (successCb) !== "function") {
				errorCb("No success callback");
				return;
			}
			if (localFileSystem === 0) {
				successCb(fileSystem);
			} else if (localFileSystem === 1) {
				successCb(fileSystem);
			} else {
				errorCb(new FileError(FileError.SYNTAX_ERR));
			}
		};
		
		// WIP fileSystem.root.getFile(

		return fileStub;
	}());

	return cordovaStub;
}());