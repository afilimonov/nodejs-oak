/**
 * Oak Microkernel core objects
 */

/**
 * MicroKernel API
 */

exports.MicroKernel = function MicroKernel(home) {
	var homeDir = home;
	var repository = new Repository(home);
};

MicroKernel.prototype.dispose = function () {
	repository.shutDown();
};

MicroKernel.prototype.getHeadRevisionId() {
	repository.getHeadRevision();
};

MicroKernel.prototype.getBaseRevisionId() {
	
};

MicroKernel.prototye.getRevisionHistory() {
	
}

/**
 * Repository object
 */

exports.Repository = function Repository (home) {
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