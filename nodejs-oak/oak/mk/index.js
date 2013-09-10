/**
 * Main mk module
 */

var api = require('./api'),
    servlet = require('./http');
 

exports.getAPI = function() {
	return new api.MicroKernel();
};

exports.getListener = function() {
	return servlet.listener;
};