process.env.NODE_ENV = process.env.NODE_ENV || "test"

var db_connection = require('../lib/connection.js'),
    cradle = require('cradle'),
    async = require('async');

if (process.env.NODE_ENV === "te1st") {
  db_connection.create_connection('lazyboy_tests');
} else {
  //db_connection.create_connection({url: 'https://garrensmith.iriscouch.com', port: '443', secure:true, db:'lazyboy_test'});
  db_connection.create_connection({url: 'https://garrensmith.cloudant.com', port: '443', cache: true, secure:true, db:'lazyboy_tests'});
}

var db = module.exports.db = db_connection.connection(); 


before(function(done) {

  console.log("cleaning db");

  db.get('_all_docs', function (err, res) {

    async.forEach(JSON.parse(res), function (item, cb) {
      db.remove(item.id, item.value.rev, function (err, res) {cb();});
    }, function () {
      done();
    });

  });
});



