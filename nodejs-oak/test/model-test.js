/**
 * Mk model unit tests
 */
var model = require('../oak/mk/model');

exports.testId = function(test) {
	test.expect(4);

	test.doesNotThrow(function() {
		new model.Id([]);
	}, 'Id constructor call');
	test.throws(function() {
		new model.Id();
	}, 'Id constructor null argument');
	test.equal(new model.Id([ 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef ])
			.toString(), '0123456789abcdef', 'Id.toString()');
	test.equal(model.Id.idFromString('0123456789abcdef').toString(), 
			'0123456789abcdef', 'Id.idFromString');
	test.done();
};
