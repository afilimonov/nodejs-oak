/**
 * Mk unit tests
 */

var api = require('../oak/mk/api');

exports.testHeadRevision = function(test) {
	var mk = new api.MicroKernel('./mk');

	test.expect(1);
	test.equals(mk.getHeadRevision(), '01', 'mk.getHeadRevision()');

	test.done();
};
