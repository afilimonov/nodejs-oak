/**
 * Mk persistence objects
 */

exports.createPersistenceManager = function() {
	return new H2Persistence();
};

H2Persistence = function() {
	this.home = null;
};

H2Persistence.prototype.initialize = function(home) {
	this.home = home;
};
