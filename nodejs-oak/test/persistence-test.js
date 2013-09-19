var persistence = require('../oak/mk/persistence');

exports.testReadIds = function(test) {
	var pm = new persistence.InMemPersistence('./mk');

	test.expect(2);
	test.deepEqual(pm.readIds(), new Array(2), 'pm.readIds()');
	test.notDeepEqual(pm.readIds(), [1], 'pmReadIds()');

	test.done();
};
