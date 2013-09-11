/**
 * Mk persistence objects
 */

exports.createPersistenceManager = function() {
	return new H2Persistence();
};

H2Pesistence = function() {
	this.home = null;
};

H2Persistence.prototype.initilize = function(home) {
	this.home = home;
};
