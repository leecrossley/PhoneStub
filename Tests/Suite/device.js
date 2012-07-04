var deviceReady;
casper.start("index.html");

casper.then(function() {
	deviceReady = this.evaluate(function() {
		var isSet;
		document.addEventListener("deviceready", function() {isSet = true;}, false);
		return isSet;
	});
});

casper.then(function() {
	this.test.assertEquals(deviceReady, true, "'deviceready' event fired");
});

casper.run(function() {
	this.test.done();
});