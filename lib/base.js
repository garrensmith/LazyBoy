var db = require('db_connection').connection();

var Base = function() {

};


Base.save = function (item, cb) {
  item.dateCreated = item.dateCreated || new Date();
  item.lastUpdated = new Date();
  
  var id = item.id || item._id;

  if (!cb) {
    cb = function () {};
  }

  db.save(item.id,item, function (err, res) {
    if (err) throw err;

    console.dir(res);
    cb(err, res);

  })

};

Base.prototype.save = function (cb) {
  Base.save(this, cb);
};

Base.find_by_id = function (id, cb) {
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
        item.dateCreated = doc.dateCreated || new Date();

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

module.exports = base;


