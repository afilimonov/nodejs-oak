var string = require('../string');

AbstractCommit = function() {

	// id of root node associated with this commit
	this.rootNodeId = null;
	// commit timestamp
	this.commitTS = null;
	// commit message
	this.msg = null;
	// changes
	this.changes = null;
	// id of parent commit
	this.parentId = null;
	// id of branch root commit
	this.branchRootId = null;
};

AbstractCommit.prototype = {
	getParentId : function() {
		return this.parentId;
	},

	getRootNodeId : function() {
		return thislrootNodeId;
	},

	getCommitTS : function() {
		return this.commitTS;
	},

	getMsg : function() {
		return this.msg;
	},

	getChanges : function() {
		return this.changes;
	},

	getBranchRootId : function() {
		return thsi.branchRootId;
	},

	serialize : function(binding) {
		binding.write("rootNodeId", this.rootNodeId.getBytes());
		binding.write("commitTS", this.commitTS);
		binding.write("msg", this.msg == null ? "" : this.msg);
		binding.write("changes", this.changes == null ? "" : this.changes);
		binding.write("parentId", this.parentId == null ? "" : this.parentId
				.toString());
		binding.write("branchRootId", this.branchRootId == null ? ""
				: this.branchRootId.toString());
	},

	toString : function() {
		var sb = new string.StringBuilder();
		sb.append("rootNodeId: '").append(this.rootNodeId.toString()).append(
				"', ");
		sb.append("commitTS: ").append(this.commitTS).append(", ");
		sb.append("msg: '").append(this.msg == null ? "" : this.msg).append(
				"', ");
		sb.append("changes: '")
				.append(this.changes == null ? "" : this.changes).append("', ");
		sb.append("parentId: '").append(
				this.parentId == null ? "" : this.parentId.toString()).append(
				"', ");
		sb.append("branchRootId: '").append(
				this.branchRootId == null ? "" : this.branchRootId.toString())
				.append("'");
		return sb.toString();
	},

	getMemory : function() {
		var memory = 100;
		if (this.msg != null) {
			memory += 2 * this.msg.length();
		}
		if (this.changes != null) {
			memory += 2 * this.changes.length();
		}
		return memory;
	}
};
