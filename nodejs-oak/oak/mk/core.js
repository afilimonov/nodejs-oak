/**
 * Oak MicroKernel core implementation objects
 */

var fs = require('fs'),
    store = require('./store'),
    persistence = require('./persistence');

var configuratin = {
	home: '.'
};

exports.getRepository = function() {
	if (this.repo == null) {
		this.repo = new Repository(configuration.home);
	}
	
	return this.repo;
};
	
Repository = function(home) {
	this.homeDir = home;
	this.initialized = false;
	this.pm = persistence.createPersistenceManager();
	this.pm.initalize(homeDir);
	this.rs = store.createRevistionStore(pm);
	this.bs = store.createBlobStore(pm);
	
	intialized = true;

};

Repository.prototype.shutDown = function() {
	
};

Repository.prototype.getRevisionStore = function() {
	if (!initialised) throw 'IllegalState: not initialized';
	return this.rs;
};

Repository.prototype.getHeaRevision = function() {
	
};

Repository.prototype.getBaseRevision = function() {
	
};

