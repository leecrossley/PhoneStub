var CordovaStub = (function () {
	var cordovaStub = {};
	window.Cordova = {};

	window.Cordova.m_addEventListener = document.addEventListener;
	
	document.addEventListener = function (e, handler, capture) {
		if (e.toLowerCase() === "deviceready") {
			$(document).ready(function () {
				if (handler && typeof (handler) === "function") {
					handler();
				}
			});
		}
		window.Cordova.m_addEventListener.call(document, evt, handler, capture);
	}

	var deviceStub = (function () {
		var deviceStub = {};
	
		function number(length) {
			var result = "", i = 0;
			while (i < length) { 
				result += (((1+Math.random())*0x10)|0).toString(9).substring(1);
				i = i + 1;
			}
			return result;
		}
		
		function generateUUID() {
			return (number(8) + "-" + number(4) + "-" + number(4)
				+ "-" + number(4) + "-" + number(12));
		}

		window.device = {
			name: navigator.appCodeName,
			cordova: "1.6.1 Stub",
			platform: navigator.platform,
			uuid: generateUUID(),
			version: navigator.appVersion
		}
		
		return deviceStub;
	})();
	
	return cordovaStub;
})();