var db_helper = require('./connection'),
    logger = require('./logger');


var Queriable = function () {
   
  this.find = function (id, cb) {
     
   logger.info("Finding model for id %s", id);

    Base.find(id, function (err, res) {
      if (err) {
        logger.error("Cannot find item with id %s error: %s", id, err);
        return cb(err, null);
      }

      cb(null, self.create(res));
    });
  }

  this.all = function (cb) {
    var self = this,
        db = db_helper.connection();

    db.view(self.model_type + '/all', function (err, docs) {
      var model_collection = [];
      
      docs.forEach(function (doc) {
        model_collection.push(self.create(doc));
      });
      
      console.dir(items);
      cb(err, model_collection);
    });

  };

  this.where = function (property, key,cb) {
    var self = this,
        db = db_helper.connection();

    db.view('User/'+property,{key: key}, function (err, docs) {
      var model_collection = [];
     
      docs.forEach(function (doc) {
        model_collection.push(self.create(doc));
      });
      
      cb(err, model_collection);
    });
  };

};

module.exports = Queriable;
