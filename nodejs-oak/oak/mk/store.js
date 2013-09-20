/**
 * Mk store objects
 */
var id = require('./model/id');

exports.RevisionStore = RevisionStore = function(pm) {
	//@id
	this.pm = pm;
    this.head; 
    pm.readId(function(headId, commitId){
    });
};

RevisionStore.NOT_ACTIVE = 0;
RevisionStore.STARTING = 1;
RevisionStore.MARKING = 2;
RevisionStore.SWEEPING = 3;


RevisionStore.prototype = {

	/*
	 * @return StoredNode
	 */
	getNode : function(id) {
	},
	/*
	 * @return StoredCommit
	 */
	getCommit : function(id) {
	},
	/*
	 * @return @ChildNodeEntriesMap
	 */
	getCNEMap : function(id) {
	},
	/*
	 * @return StoredNode
	 */
	getRootNode : function(commitId) {
	},
	/*
	 * @return StoredCommit
	 */
	getHeadCommit : function() {
	},
	/*
	 * @return Id;
	 */
	getHeadCommitId : function() {
		return this.head;
	},

	/*
	 * @MutalbelNode @ChileNodeEntries
	 */
	putNode : function(token, node) {
	},
	putCNEMap : function(token, map) {
	},

	/**
	 * Lock the head. Must be called prior to putting a new head commit.
	 * 
	 * @see #putHeadCommit(PutToken, MutableCommit, Id, Id)
	 * @see #unlockHead()
	 */
	lockHead : function() {
	},

	/**
	 * Put a new head commit. Must be called while holding a lock on the head.
	 * 
	 * @param token
	 *            put token
	 * @param MutableCommit
	 *            commit commit
	 * @param branchRootId
	 *            former branch root id, if this is a merge; otherwise
	 *            {@code null}
	 * @param branchRevId
	 *            current branch head, i.e. last commit on this branch, if this
	 *            is a merge; otherwise {@code null}
	 * @return head commit id
	 * @throws Exception
	 *             if an error occurs
	 * @see #lockHead()
	 */
	putHeadCommit : function(token, commit, branchRootId, branchRevId) {
	},

	/**
	 * Unlock the head.
	 * 
	 * @see #lockHead()
	 */
	unlockHead : function() {
	},

	/**
	 * Store a new commit. <p/> Unlike {@code putHeadCommit(MutableCommit)},
	 * this method does not affect the current head commit and therefore doesn't
	 * require a lock on the head.
	 * 
	 * @param token
	 *            put token
	 * @param MutableCommit
	 *            commit commit
	 * @return new commit id
	 * @throws Exception
	 *             if an error occurs
	 */
	putCommit : function(token, commit) {
	}
};

exports.BlobStore = BlobStore = function(pm) {
	this.pm = pm;
};