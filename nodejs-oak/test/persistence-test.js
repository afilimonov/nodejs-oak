var persistence = require('../oak/mk/persistence');

exports.testReadIds = function(test) {
	var pm = persistence('./mk');

	test.expect(0);
	pm.readIds(function(head,commit) {
        console.log('head: ' + head + ' commit: ' + commit);
        test.ok(true, 'pm.readIds()');
    });

	test.done();
};
