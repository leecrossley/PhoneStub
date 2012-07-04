var fs = require("fs"),
	utils = require("utils"),
	f = utils.format,
	tests = ["Suite"];
	
var casper = require("casper").create({
	exitOnError: false
});

casper.setFilter("open.location", function(location) {
	if (!/^http/.test(location)) {
		if (location === "" || location === "/") {
			location = location + "index.html";
		}
		return f('file://%s/%s', fs.workingDirectory, location);
	}
	return location;
});

casper.test.on("tests.complete", function() {
	this.renderResults(true, undefined, undefined);
});

casper.test.runSuites.apply(casper.test, tests);