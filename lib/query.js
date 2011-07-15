var db_helper = require('./connection'),
    logger = require('./logger');


var Queriable = function () {

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


  this.all = function (cb) {
    var self = this,
        db = db_helper.connection();

    db.view(self.model_type + '/all', function (err, docs) {
      if (err) {
        return cb(err, null);
      }
      
      var model_collection = [];

      docs.forEach(function (doc) {
        model_collection.push(self.create(doc));
      });

      cb(null, model_collection);
    });

  };

  this.where = function (property, key,cb) {
    var self = this,
        db = db_helper.connection();

    db.view(this.model_type + '/'+property,{key: key}, function (err, docs) {
      if (err) {
        return cb(err, null);
      }
      
      var model_collection = [];
      
      docs.forEach(function (doc) {
        model_collection.push(self.create(doc));
      });

      cb(null, model_collection);
    });
  };

};

module.exports = Queriable;
