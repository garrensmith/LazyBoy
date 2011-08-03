var db_helper = require('./connection'),
    logger = require('./logger');


var Queriable = function () {

  this.onDocLoad = function (fn) {
    this.onDocLoadFn = fn;
  };

  this.find = function (id, cb) {
    var db = db_helper.connection(),
        self = this;

    logger.info("Finding model for id %s", id);

    db.get(id, function (err, doc) {
      if (err) {
        logger.error("Cannot find item with id %s error: %s", id, err);
        cb(err, null);
        return;
      }
      if(doc) {
        try {
          cb(null,self.onDocLoadFn(doc));
        } catch(ex) {
          dumpError(ex);
          cb(ex,null);
        }
      } else {
        cb("item does not exist", null);
      }
    });

  };

  this._view = function (view_name, view_options, cb) {
    var _cb, 
        options, 
        db = db_helper.connection(), 
        self = this;
    
    if (cb) {
      _cb = cb;
      options = view_options;
    } else {
      _cb = arguments[arguments.length - 1]
    }
    

    db.view(view_name, options, function (err, docs) {
      if (err) {
        return _cb(err, null);
      }
      
      var model_collection = [];

      docs.forEach(function (doc) {
        model_collection.push(self.onDocLoadFn(doc));
      });

      _cb(null, model_collection);
    });


  };


  this.all = function (cb) {
    
    this._view(this.model_type + '/all',cb);

  };

  this.where = function (property, key,cb) {
    
    this._view(this.model_type + '/'+property,{key: key}, cb);
  };

  

};

module.exports = Queriable;


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

