var http = require('http'),
    servlet = require('./oak/binding/http');

var options = {
	host : 'localhost',
	port : 1337
};

http.createServer(servlet.listener).listen(
		1337,
		'localhost',
		function() {
			console.log('Server running at http://' + 'localhost' + ':' +
					'1337' + '/');
		});

