var  _ = require('underscore'),
     Q = require('Q'),
     LazyBoy = require('../lib/index');

var createDb = module.exports.createDb = function () {
 return LazyBoy.config('http://localhost:5984/lzb');
};

module.exports.cleanDb = function (callback) {
  var promises = [],
      db = createDb();

  db.get('_all_docs', function (err, result) {
    _.each(result.rows, function (row) {
      var promise = Q.nfcall( db.destroy, row.id, row.value.rev);
    });

    Q.all(promises).then(function () {
      setTimeout( function () {
        callback(null, 'done');
      }, 100);
    }, function (err) {
      callback(err, null);
    });
  });
};
