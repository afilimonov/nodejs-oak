var id = require('../oak/mk/model/id'), commit = require('../oak/mk/model/commit');

exports.testCommit = function(test) {
	var testCommit = new commit.StoredCommit(new id.Id.idFromString('02'),
			new id.Id.idFromString('01'), 0, id.Id.idFromString('03'),
			'Test Commit', '+commit', new id.Id.idFromString('04'));

	test.expect(0);

	test.done();
};
