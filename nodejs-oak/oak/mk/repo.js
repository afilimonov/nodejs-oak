/**
 * Oak MicroKernel core implementation objects
 */

var fs = require('fs'),
    store = require('./store'),
    persistence = require('./persistence'),
    io = require('./io');

exports.Repository = Repository = function(home) {
	this.homeDir = home;	
	this.initialized = false;
	this.pm = null;
	this.rs = null;
	this.bs = null;
	
	this.pm = persistence.createPersistenceManager();
	this.pm.initialize(this.homeDir);
	this.rs = store.createRevisionStore(this.pm);
	this.bs = store.createBlobStore(this.pm);
	
	intialized = true;

};

Repository.prototype.shutDown = function() {
	if (!initialized) return;
	io.close(this.rs);
	io.close(this.bs);
};

Repository.prototype.getRevisionStore = function() {
	if (!initialised) throw 'IllegalState: not initialized';
	return this.rs;
};

Repository.prototype.getBlobStore = function() {
    if (!initialized) throw new 'IllegalState: not initialized';

    return this.bs;
};

Repository.prototype.getHeadRevision = function() {
    if (!initialized) throw 'IllegalState: not initialized';
    return rs.getHeadCommitId();
};

Repository.prototype.getBaseRevision = function (branchRevision) {
    if (!initialized) throw 'IllegalState: not initialized';
    
    var commit = rs.getCommit(branchRevision);
    return commit == null ? null : commit.getBranchRootId();
};

//public StoredCommit getHeadCommit() throws Exception {
//    if (!initialized) {
//        throw new IllegalStateException("not initialized");
//    }
//    return rs.getHeadCommit();
//}
//
//public StoredCommit getCommit(Id id) throws NotFoundException, Exception {
//    if (!initialized) {
//        throw new IllegalStateException("not initialized");
//    }
//    return rs.getCommit(id);
//}
//
//public StoredNode getNode(Id revId, String path) throws NotFoundException, Exception {
//    if (!initialized) {
//        throw new IllegalStateException("not initialized");
//    } else if (!PathUtils.isAbsolute(path)) {
//        throw new IllegalArgumentException("illegal path");
//    }
//
//    StoredNode node = rs.getRootNode(revId);
//    for (String name : PathUtils.elements(path)) {
//        ChildNodeEntry cne = node.getChildNodeEntry(name);
//        if (cne == null) {
//            throw new NotFoundException();
//        }
//        node = rs.getNode(cne.getId()) ;
//    }
//    return node;
//}
//
//public boolean nodeExists(Id revId, String path) throws Exception {
//    if (!initialized) {
//        throw new IllegalStateException("not initialized");
//    } else if (!PathUtils.isAbsolute(path)) {
//        throw new IllegalArgumentException("illegal path");
//    }
//
//    StoredNode node = rs.getRootNode(revId);
//    for (String name : PathUtils.elements(path)) {
//        ChildNodeEntry cne = node.getChildNodeEntry(name);
//        if (cne == null) {
//            return false;
//        }
//        node = rs.getNode(cne.getId()) ;
//    }
//    return true;
//}
//
//public CommitBuilder getCommitBuilder(Id revId, String msg) throws Exception {
//    return new CommitBuilder(revId, msg, rs);
//}
//
//
