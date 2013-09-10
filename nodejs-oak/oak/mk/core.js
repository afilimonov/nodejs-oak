/**
 * Oak MicroKernel core implementation objects
 */

exports.Repository = Repository = function(home) {
	var homeDir = home;
	var initialized = false;
	var rs = new RevisionStore();
	var bs = new BlobStore();
	
	rs.initialize();
	intialized = true;

};

Repository.prototype.shutDown = function() {
	
};

Repository.prototype.getHeaRevision = function() {
	
};

Repository.prototype.getBaseRevision = function() {
	
};

function RevisionStore() {
	
}

function BlobStore() {
	
}