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
        model_collection.push(self.create(doc));
      });

      _cb(null, model_collection);
    });


  };


  this.all = function (cb) {
    /*var self = this,
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
    });*/

    this._view(this.model_type + '/all',cb);

  };

  this.where = function (property, key,cb) {
    /*var self = this,
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
    }); */

    this._view(this.model_type + '/'+property,{key: key}, cb);
  };

  

};

module.exports = Queriable;
