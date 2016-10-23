(function(undefined){
    var bluebird = require("bluebird");
    
    global.Promise = global.Promise || bluebird;
}());