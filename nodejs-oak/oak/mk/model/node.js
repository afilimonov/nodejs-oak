/**
 * Mk data model implementation
 */

var string = collections = require('../collections'), map = require('collections/map');

exports.ChildNodeEntry = ChildNodeEntry = function(name, id) {

	this.name = name;
	this.id = id;
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
			return ((this.name == null ? obj.getName() == null : this.name
					.valueOf() == obj.name.valueOf())
					&& (this.id == null ? obj.getId() == null : this.id
					.equals(obj.id)));
		}
		return false;
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

ChildNodeEntriesMap.prototype = {

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
