var db_helper = require('./connection');

var Base = module.exports = function() {

};

Base.save = function (item, cb) {
  item.dateCreated = item.dateCreated || new Date();
  item.lastUpdated = new Date();
  
  var id = item.id || item._id;

  if (!cb) {
    cb = function () {};
  }

  var db = db_helper.connection();

  db.save(id,item, function (err, res) {
    if (err) throw err;

    cb(err, res);
  })

};

Base.prototype.save = function (cb) {
  Base.save(this, cb);
};

Base.find = function (id, cb) {
  var db = db_helper.connection();

  // validate id
  var self = this;

  db.get(id, function (err, doc) {
    if (err) {
      cb(err, null);
      return;
    }
    console.dir(doc);
    if(doc) {
      try {
        var item = new self(doc)

        cb(null,item);
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

function dumpError(err) {
  if (typeof err === 'object') {
    if (err.message) {
      console.log('\nMessage: ' + err.message)
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack);
    }
  } else {
    console.log('dumpError :: argument is not an object');
  }
}



