var http = require('http'),
    mk = require('./oak/mk'),
    map = require('collections/map');

var options = {
	host : 'localhost',
	port : 1337
};

var api = mk.getAPI();

http.createServer(mk.getListener(api)).listen(
		1337,
		'localhost',
		function() {
			console.log('Server running at http://' + 'localhost' + ':' +
					'1337' + '/');
		});

