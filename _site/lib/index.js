var base = require('./base'),
    connection = require('./connection'),
    logger = require('./logger'),
    Model = require('./model');
    
module.exports = Model;
module.exports.logger = logger;
//module.exports.base = base;
module.exports.connection = connection;


