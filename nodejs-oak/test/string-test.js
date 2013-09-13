/**
 * String utilities unit tests
 */
var string = require('../oak/mk/string');

exports.testId = function(test){
    test.expect(7);
    
    test.equal(string.convertBytesToHex([0x01,0x23]), 
    		   '0123', 'convertBytesToHex');
    test.equal(string.convertBytesToHex([0x89,0xbd]), 
 		   	   '89bd', 'convertBytesToHex');
    test.equal(string.convertBytesToHex([0xfa,0xce]), 
 		   	   'face', 'convertBytesToHex');
    
    test.deepEqual(string.convertHexToBytes('face'), 
    		       [0xfa,0xce], 'convertHexToBytes');
    test.deepEqual(string.convertHexToBytes('fAcE'), 
		       [0xfa,0xce], 'convertHexToBytes');
    test.deepEqual(string.convertHexToBytes('FaCe'), 
		       [0xfa,0xce], 'convertHexToBytes');
    test.deepEqual(string.convertHexToBytes('09af'), 
		       [0x09,0xaf], 'convertHexToBytes');

    test.done();
};