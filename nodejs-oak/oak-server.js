var http = require('http'),
    mk = require('./oak/mk');

var options = {
	host : 'localhost',
	port : 1337
};

http.createServer(mk.getListener()).listen(
		1337,
		'localhost',
		function() {
			console.log('Server running at http://' + 'localhost' + ':' +
					'1337' + '/');
		});

