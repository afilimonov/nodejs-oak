/**
 * Mk store objects
 */

 exports.createRevisionStore = function(pm) {
	 return new RevisionStore(pm);
 };
 
 exports.createBlobStore = function(pm) {
	 return new BlobStore(pm);
 };

RevisionStore = function(pm) {
	this.pm = pm;
};

RevisionStore.prototype.initialize = function() {};

BlobStore = function(pm) {
	this.pm = pm;
};