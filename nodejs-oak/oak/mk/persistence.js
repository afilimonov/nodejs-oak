/**
 * Mk persistence objects
 */

Persistence = function(home) {
	this.home = home;
};

Persistence.prototype = {
	/**
	 * Return an array of ids, where the first is the head id (as stored with
	 * {@link #writeHead(Id)}) and the second is the highest commit id found or
	 * {@code null}. <p/> This method is not guaranteed to deliver "live"
	 * results, after something is written to the storage, so it should better
	 * be used once after initialization.
	 * 
	 * @return array of
	 * @Id[] ids
	 * @throws Exception
	 *             if an error occurs
	 */
	readIds : function() {
	},

	/*
	 * @Id id
	 */
	writeHead : function(id) {
	},

	/**
	 * Read a node from storage.
	 * 
	 * @param
	 * @StoredNode node node to read, with id given in
	 *             {@link StoredNode#getId()}
	 * @throws NotFoundException
	 *             if no such node is found
	 * @throws Exception
	 *             if some other error occurs
	 */
	readNode : function(node) {
	},

	writeNode : function(node) {
	},

	readCNEMap : function(id) {
	},

	writeCNEMap : function(map) {
	},

	readCommit : function(id) {
	},

	/**
	 * Persist a commit with an id provided by the caller.
	 * 
	 * @param id
	 *            commit id
	 * @param commit
	 *            commit
	 * @throws Exception
	 *             if an error occurs
	 */
	writeCommit : function(id, commit) {
	},

	/**
	 * Advanced persistence implementation offering GC support.
	 * <p>
	 * The persistence implementation must ensure that objects written between
	 * {@link #start()} and {@link #sweep()} are not swept, in other words, they
	 * must be marked implicitly.
	 */

	/**
	 * Start a GC cycle. All objects written to the persistence in subsequent
	 * calls are marked implicitely, i.e. they must be retained on
	 * {@link #sweep()}.
	 */
	start : function() {
	},

	/**
	 * Mark a commit.
	 * 
	 * @param id
	 *            commit id
	 * @return {@code true} if the commit was not marked before; {@code false}
	 *         otherwise
	 * 
	 * @throws Exception
	 *             if an error occurs
	 */
	markCommit : function(id) {
	},

	/**
	 * Replace a commit. Introduced to replace dangling parent commits where a
	 * parent commit might be collected.
	 * 
	 * @param id
	 *            commit id
	 * @param
	 * @return {@code true} if the commit was not marked before; {@code false}
	 *         otherwise
	 * 
	 * @throws Exception
	 *             if an error occurs
	 */
	replaceCommit : function(id, commit) {
	},

	/**
	 * Mark a node.
	 * 
	 * @param id
	 *            node id
	 * @return {@code true} if the node was not marked before; {@code false}
	 *         otherwise
	 * 
	 * @throws Exception
	 *             if an error occurs
	 */
	markNode : function(id) {
	},

	/**
	 * Mark a child node entry map.
	 * 
	 * @param id
	 *            child node entry map id
	 * @return {@code true} if the child node entry map was not marked before;
	 *         {@code false} otherwise
	 * 
	 * @throws Exception
	 *             if an error occurs
	 */
	markCNEMap : function(id) {
	},

	/**
	 * Sweep all objects that are not marked and were written before the GC
	 * started.
	 * 
	 * @return number of swept items or <code>-1</code> if number is unknown
	 * @throws Exception
	 *             if an error occurs
	 */
	sweep : function() {
	}
};

exports.H2Persistence = H2Persistence = function(home) {
	// @String home directory
	this.home = home;
};

exports.InMemPersistence = InMemPersistence = function(home) {
	this.home = home;
};

InMemPersistence.prototype.__proto__ = Persistence.prototype;

InMemPersistence.prototype = {
	readIds: function() {
		return new Array(2);
	}	
};
