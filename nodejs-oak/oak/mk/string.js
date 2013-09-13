/**
 * String utilities
 */

/**
* Convert a byte array to a hex encoded string.
*
* @param value the byte array
* @return the hex encoded string
*/
exports.convertBytesToHex = function(value) {
	var result = "";
    for (var i = 0; i < value.length; i++) {
        var str = value[i].toString(16);

        z = 2- str.length + 1;
        str = Array(z).join("0") + str;

        result += str;
    }

    return result;
};

/**
* Convert a hex encoded string to a byte array.
*
* @param string the hex encoded string
* @return the byte array
*/
exports.convertHexToBytes = function(string) {
	var result = [];
    while (string.length > 0) { 
        result.push(parseInt(string.substring(0, 2), 16));

        string = string.substring(2, string.length);
    }

    return result;
};

//Initializes a new instance of the StringBuilder class
//and appends the given value if supplied
exports.StringBuilder = StringBuilder = function(value) {
 this.strings = new Array("");
 this.append(value);
};

//Appends the given value to the end of this instance.
StringBuilder.prototype.append = {
	append: function (value) {
		if (value) {
			this.strings.push(value);
		}
	},

//Clears the string buffer
	StringBuilder: function () {
		this.strings.length = 1;
	},

//Converts this instance to a String.
	toString: function () {
		return this.strings.join("");
	}
};
