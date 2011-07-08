var Log = require('coloured-log'),
    logLevel = Log.ALERT,
    logger;

var Logger = function (logLevel) {
  var self = this;
  
  self.logLevel = logLevel;
  Log.call(this);

  //self.info = function() {
  //  coloured_log.info.apply(this, arguments);    
  //}
  
  self.setLogLevel = function (new_logLevel) {
  self.level = new_logLevel;
  }
  
}

require('sys').inherits(Logger, Log);

module.exports = new Logger(Log.ALERT);


