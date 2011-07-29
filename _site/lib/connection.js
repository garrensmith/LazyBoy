var cradle = require('cradle'),
    logger = require('./logger');


var db;

module.exports.create_connection = function (db_name) {
  logger.info("Connecting to %s",db_name);   
  db = new (cradle.Connection)().database(db_name);

  return db;
};


module.exports.connection = function () {

  return db ;//|| create_connection(db_name);

};


