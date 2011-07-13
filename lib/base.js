var async = require('async'),
    db_helper = require('./connection'),
    logger = require('./logger');


var Saveable = function() {
  
  this.beforeSaveFn = function () {};
  this.afterSaveFn = function () {};


  this.save = function (cb) {
    var self = this;  

    if (!cb) {
      cb = function () {};
    }

    self.dateCreated = self.dateCreated || new Date();
    self.lastUpdated = new Date();

    var id = self.id || self._id;
    
    self.beforeSaveFn && self.beforeSaveFn(self);
            
    logger.info("Saving %s",self);

    var db = db_helper.connection();

    db.save(id,self, function (err, res) {
      if (err) {
        dumpError(err); 
        return cb(err, null);
      }
      
      self.id = res.id || res._id;

      self.afterSaveFn && self.afterSaveFn(self)
      
      cb(null, self);
    })

  };
};



function dumpError(err) {
  if (typeof err === 'object') {
    if (err.message) {
      logger.error('\nMessage: ' + err.message)
    }
    if (err.stack) {
      logger.error('\nStacktrace:')
        logger.error('====================')
        logger.error(err.stack);
    }

    if (err.error) {
      //console.dir(err);
    }
  } else {
    logger.error('dumpError :: argument is not an object');
  }
}

module.exports.Saveable = Saveable;



