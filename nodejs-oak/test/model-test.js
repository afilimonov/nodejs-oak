/**
 * Mk model unit tests
 */
var id = require('../oak/mk/model/id'),
    node = require('../oak/mk/model/node');

exports.testId = function(test) {
	test.expect(4);

	test.doesNotThrow(function() {
		new id.Id([]);
	}, 'Id constructor call');
	test.throws(function() {
		new id.Id();
	}, 'Id constructor null argument');
	test.equal(new id.Id([ 0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef ])
			.toString(), '0123456789abcdef', 'Id.toString()');
	test.equal(id.Id.idFromString('0123456789abcdef').toString(),
			'0123456789abcdef', 'Id.idFromString');
	test.done();
};

exports.testChildNodeEntry = function(test) {
	var entry1 = new node.ChildNodeEntry('1', id.Id
			.idFromString('0123456789abcdef'));
	var entry2 = new node.ChildNodeEntry('1', id.Id
			.idFromString('0123456789abcdef'));
	var entry3 = new node.ChildNodeEntry('2', id.Id
			.idFromString('0123456789abcdef'));
	var entry4 = new node.ChildNodeEntry('1', id.Id
			.idFromString('1123456789abcdef'));

	test.expect(4);
	test.ok(entry1.equals(entry1), 'ChildNodeEntry.equal()');
	test.ok(entry1.equals(entry2), 'ChildNodeEntry.equal()');
	test.ok(!entry1.equals(entry3), 'ChildNodeEntry.equal()');
	test.ok(!entry1.equals(entry4), 'ChildNodeEntry.equal()');

	test.done();
};
