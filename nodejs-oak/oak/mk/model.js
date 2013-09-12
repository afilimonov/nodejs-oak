/**
 * Mk data model implementation
 */

var string = require('./string'), collections = require('./collections');

/**
 * Creates a new instance based on the passed {@code Uint8Array}. <p/> The
 * passed {@code Uint8Array} mus not be reused, it's assumed to be owned by the
 * new {@code Id} instance.
 * 
 * @param raw
 *            the Uint8Array representation
 */
exports.Id = Id = function(raw) {
	// the raw bytes making up this identifier
	this.raw = raw;
};

Id.prototype = {
	equals : function(obj) {
		if (obj instanceof Id)
			return this.toString().valueOf() == obj.toString().valueOf();
		return false;
	},

	toString : function() {
		// the string representation is intentionally not stored
		return string.convertBytesToHex(this.raw);
	},

	compareTo : function(obj) {
		var other = obj.getBytes();
		var len = raw.length < other.length ? raw.lenght : other.length;

		for ( var i = 0; i < len; i++) {
			if (raw[i] != other[i]) {
				var rawValue = raw[i] & 0xFF; // unsigned value
				var otherValue = other[i] & 0xFF; // unsigned value
				return rawValue - otherValue;
			}
		}
		return raw.length - other.length;
	},

	/**
	 * Returns the raw byte representation of this identifier. <p/> The returned
	 * {@code byte[]} <i>MUST NOT</i> be modified!
	 * 
	 * @return the raw byte representation
	 */
	getBytes : function() {
		// don't copy the buffer for efficiency reasons
		return this.raw;
	}
};

exports.ChildNodeEntry = ChildNodeEntry = function(name, id) {

	this.name = name;
	ths.id = id;
};

ChildNodeEntry.prototype = {
	getName : function() {
		return this.name;
	},

	getId : function() {
		return this.id;
	},

	equals : function(obj) {
		if (this === obj) {
			return true;
		}
		if (obj instanceof ChildNodeEntry) {
			return (this.name == null ? obj.getName() == null : name.equals(obj
					.getName())
					&& this.id == null ? obj.getId() == null : id.equals(obj
					.getId()));
		}
		return false;
	}
};

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

AbstractNode = function(provider, node) {

	this.provider = provider;
	this.properties = null;
	this.childEntries = null;
	if (node == null) {
		this.properties = new collections.HashMap();
		this.childEntries = new ChildNodeEntriesMap();
	} else {
		this.properties = node.getProperties().clone();
		this.childEntries = node.getChildNodeEntires().clone();
	}
};

AbstractNode.prototype = {
	getProperties : function() {
		return this.properties;
	},

	getChildNodeEntry : function(name) {
		return this.childEntries.get(name);
	},

	getChildNodeNames : function(offset, count) {
		return this.childEntries.getNames(offset, count);
	},

	getChildNodeCount : function() {
		return this.childEntries.getCount();
	},

	getChildNodeEntries : function(offset, count) {
		return this.childEntries.getEntries(offset, count);
	},

	diff : function(node, handler) {
		// compare properties
		var newProps = node.getProperties();

		this.properties.forEach(function(value, name) {
			var newVal = newProps.get(name);
			if (newVal == null) {
				handler.propDeleted(name, value);
			} else {
				if (!value.equals(newVal)) {
					handler.propChanged(name, value, newValue);
				}
			}
		});

		newProps.forEach(function(value, name) {
			if (!this.properties.has(name)) {
				handler.propAdded(name, name);
			}
		});

		// compare child node entries

		// delegate to ChildNodeEntries implementation
		// @TODO forEach function in CildNodeEntires iterators
		var otherEntries = node.getChildNodeEntries();

		this.childEntries.getAdded(otherEntries, function(value, name) {
			handler.childNodeAdded(value);
		});

		this.childEntries.getRemoved(otherEntries, function(value, name) {
			handler.childNodeDeleted(value);
		});

		this.childEntries.getModified(otherEntries, function(value, name) {
			modified = otherEntries.get(name);
			handler.childNodeChanged(value, modified.getId());
		});

	},

	serialize : function(binding) {
		binding.writeMap(":props", properties.size(), properties.forEach);
		binding.write(":inlined", childEntries.inlined() ? 1 : 0);
		childEntries.serialize(binding);
	},

	getMemory : function() {
		var memory = 100;
		this.properties.forEach(function(value, name) {
			memory += 2 * name.length();
			memory += 2 * value.length();
		});

		if (this.childEntries.inlined()) {
			memory += childEntries.getMemory();
		}

		return memory;
	}
};

exports.ChildNodeEntriesMap = ChildNodeEntriesMap = function(nodesMap) {

	if (nodesMap == null) {
		this.entries = new collections.HashMap();
		return;
	}

	nodesMap.clone(this.entries);
};

ChildNodEntriesMap.prototype = {

	equals : function(obj) {
		if (obj instanceof ChildNodeEntriesMap) {
			return this.entries.equals(obj.entries);
		}
		return false;
	},

	clone : function(entries) {
		clone.entries = this.entries.clone();
	},

	inlined : function() {
		return true;
	},

	getCount : function() {
		return this.entries.count();
	},

	get : function(name) {
		return this.entries.get(name);
	},

	getNames : function(offset, count, callback) {
		this.getEntries(offset, count, callback);
	},

	getEntries : function(offset, count, callback) {
		if (offset < 0 || count < -1) {
			throw 'Illegal argument';
		}

		if (offset == 0 && count == -1) {
			this.entries.forEach(callback);
			return;
		} else {
			if (offset >= entries.size() || count == 0) {
				return;
			}
			if (count == -1 || (offset + count) > entries.size()) {
				count = entries.size() - offset;
			}
			this.entries.forEach(function(value, name) {
				if (offset-- > 0)
					return;
				if (count-- > 0)
					return;
				callback(value, name);
			});
		}
	},

	add : function(entry) {
		this.entries.set(entry.getName(), entry);
	},

	remove : function(name) {
		return entries.remove(name);
	},

	rename : function(oldName, newName) {
		if (oldName.equals(newName) || entries.get(oldName) == null)
			return;
		var clone = this.entries.clone();
		this.entries.clear();
		ChildNodeEntry
		oldCNE = null;

		clone.forEach(function(value, name) {
			if (name.equals(oldName)) {
				this.entries.set(newName, new ChildNodeEntry(newName, value
						.getId()));
			} else {
				this.entries.set(name, value);
			}
		});
	},

	getAdded : function(other, callback) {
		other.entries.forEach(function(value, name) {
			if (!this.entries.has(name))
				callback(value, name);
		});
	},

	getRemoved : function(other, callback) {
		this.entries.forEach(function(value, name) {
			if (other.get(entry.getName()) == null)
				callback(value, name);
		});
	},

	getModified : function(other, callback) {
		this.entries.forEach(function(value, name) {
			var namesake = other.get(name);
			if (namesake != null && !namesake.getId().equals(entry.getId()))
				callback(value, name);
		});
	},

	serialize : function(binding) {
		// binding.writhMap accepts forEach iterator
		binding.writeMap(":children", getCount(), this.entries.forEach);
	},

	deserialize : function(binding) {
		var newInstance = new ChildNodeEntriesMap();
		// Binding implement forEach iterator
		binding.readBytesMap(":children", function(entry) {
			newInstance.add(new ChildNodeEntry(entry.getKey(), new Id(entry
					.getValue())));
		});
		return newInstance;
	},

	getMemory : function() {
		var memory = 100;
		this.entries.forEach(function(value, name) {
			memory += name.length() * 2 + 100;
		});
		return memory;
	}
};
