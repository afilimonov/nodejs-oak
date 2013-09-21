var persistence = require('../oak/mk/persistence');

exports.testInitalize = function(test) {
	var pm = persistence('./mk')
    
    pm.on('empty', function(){
            test.ok(true, 'expect empty repository');
            test.done();
        });

};
