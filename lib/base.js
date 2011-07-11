var db_helper = require('./connection'),
    logger = require('./logger');


var Saveable = function() {
  /*this.beforeSave= function (fn) {
    this.beforeSaveFn = fn;

  };*/

  this.save = function (cb) {
    var self = this;  

    self.dateCreated = self.dateCreated || new Date();
    self.lastUpdated = new Date();

    var id = self.id || self._id;

    if (!cb) {
      cb = function () {};
    }
    
    var done = function () {};
    if (this.beforeSaveFn) {
      //beforeSaveFn(done, self);
      
    };

    logger.info("Saving %s",self);
    

    var db = db_helper.connection();

    db.save(id,self, function (err, res) {
      if (err) {
        dumpError(err); 
        return cb(err, null);
      }

            
      self.id = res.id || res._id;
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



