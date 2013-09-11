/**
 * HTTP binding
 */

var string = require('./string');

exports.listener = function(req, res) {
		res.writeHead(200, {
			'Content-Type' : 'text/plain'
		});
		
		var a = [123676133, 
		         198914513, 
		         129998601, 
		         245147334, 
		         11918451, 
		         206998232, 
		         96766191, 
		         75984899, 
		         177840095, 
		         106709334, 
		         42320122];
		var b = string.convertBytesToHex(a);
		var c = string.convertHexToBytes(b);
		res.end('Hello World\n' + b + '\n' + c);		
};
