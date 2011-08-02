var cradle = require('cradle'),
    logger = require('./logger'),
    db;

module.exports.create_connection = function (options) {
  if (typeof(options) === 'string') {
    logger.info("Connecting to %s",options);   
    db = new (cradle.Connection)().database(options);
  
    return db;
  }  
  
  var _options = {},
      db_name = options.db,
      url = options.url,
      port = options.port;

  _options.secure = options.secure || false;
  _options.auth = options.auth;

  
    
  db = new (cradle.Connection)(url,port, _options).database(db_name);


  return db;
};


module.exports.connection = function () {

  return db;
};


