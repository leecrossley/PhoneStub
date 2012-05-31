/*jslint bitwise: true */
/*global window, document, navigator, setTimeout */

if (typeof (window) === "undefined") {
	if (typeof (jsdom) === "undefined") {
		var window = {};
	} else {
		var window = jsdom.jsdom().createWindow();
	}
}

window.Cordova = {};

var CordovaStub = (function () {
	"use strict";
	var cordovaStub = {},
		deviceStub;

	window.Cordova.m_addEventListener = document.addEventListener;

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
			window.Cordova.m_addEventListener.call(document, e, handler, capture);
		}
	};

	deviceStub = (function () {
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

		return deviceStub;
	}());

	return cordovaStub;
}());