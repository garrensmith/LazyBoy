var Log = require('coloured-log');

var Logger = function (logLevel) {
  Log.call(this);
  
  var self = this;
  self.level = logLevel;
  

  self.setLogLevel = function (new_logLevel) {
    self.level = new_logLevel;
  }
  
}

require('sys').inherits(Logger, Log);

module.exports = new Logger(Log.ALERT);


