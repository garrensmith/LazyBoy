var db_helper = require('./connection'),
    Model = require('./index'),
    logger = require('./logger');


var Saveable = function() {
  this.save = function (item, cb) {
    item.dateCreated = item.dateCreated || new Date();
    item.lastUpdated = new Date();

    var id = item.id || item._id;

    if (!cb) {
      cb = function () {};
    }

    logger.info("Saving %s",item);

    var db = db_helper.connection();

    db.save(id,item, function (err, res) {
      if (err) {
        dumpError(err); 
        return cb(err, null);
      }

      item.id = res.id || res._id;
      cb(err, item);
    })

  };
};

Saveable.prototype.save = function (cb) {
  Base.save(this, cb);
};

var Findable = function () {

  this.find = function (id, cb) {
    var db = db_helper.connection();

    // validate id
    var self = this;

    db.get(id, function (err, doc) {
      if (err) {
        cb(err, null);
        return;
      }
      if(doc) {
        try {

          cb(null,doc);
        } catch(ex) {
          console.log("error creating item");
          console.dir(ex,true);
          dumpError(ex);
          cb(ex,null);
        }
      } else {
        cb("item does not exist", null);
      }
    });

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
  } else {
    logger.error('dumpError :: argument is not an object');
  }
}

module.exports.Saveable = Saveable;
module.exports.Findable = Findable;



