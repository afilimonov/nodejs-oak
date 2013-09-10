/**
 * Oak Microkernel core objects
 */

function Repository () {
	var homeDir;
	var initialized = false;
	var rs = new RevisionStore();
	var bs = new BlobStore();
	
	rs.initialize();
	intialized = true;
	
}


function RevisionStore() {
	
}

function BlobStore() {
	
}