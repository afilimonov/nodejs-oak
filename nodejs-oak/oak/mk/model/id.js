var string = require('../string');

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
	if (raw == null)
		throw 'Invalid argument';
	this.raw = raw;
};

Id.idFromString = function(id) {
	return new Id(string.convertHexToBytes(id));
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
