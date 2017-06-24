var mongoose = require('mongoose');
var credentials = require('./config')
module.exports = {
    dbConnectionString : function(){
        return `mongodb://${credentials.username}:${credentials.pwd}@ds133932.mlab.com:33932/sigera`
    }
}