var http = require("http");
var fs = require("fs");
var zombie = require("zombie");
var assert = require("assert");

http.createServer(function (request, response) {
	fs.readFile("./index.html", function(error, content) {
		if (error) {
			response.writeHead(500);
			response.end();
		} else {
			response.writeHead(200, { "Content-Type": "text/html" });
			response.end(content, "utf-8");
		}
	});
}).listen(8125);

zombie.debug = true;

var browser = new zombie();

browser.on("error", function(error) {
	console.error(error);
});

browser.visit("http://localhost:8125/", function() {
	assert.ok(browser.success);
	assert.equal(browser.text("title"), "Cordova Stub Tests");
});