var http = require('http');

var options = {
	host : 'localhost',
	port : 1337
};

http.createServer(listener).listen(
		opitons.port,
		options.host,
		function() {
			console.log('Server running at http://' + options.host + ':' +
					options.port + '/');
		});

function listener(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end('Hello World\n');
}
