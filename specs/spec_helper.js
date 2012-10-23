var db_connection = require('../lib/connection.js'),
    cradle = require('cradle'),
    async = require('async');

//db_connection.create_connection('lazyboy_tests');
//db_connection.create_connection({url: 'https://garrensmith.iriscouch.com', port: '443', secure:true, db:'lazyboy_test'});
db_connection.create_connection({url: 'https://garrensmith.cloudant.com', port: '443', cache: true, secure:true, db:'lazyboy_tests'});
//
//var db = db_connection.connection();
//var db = module.exports.db = new (cradle.Connection)('https://garrensmith.iriscouch.com','443',{secure: true}).database('lazyboy_test');
//var db = module.exports.db = new (cradle.Connection)('https://garrensmith.cloudant.com','443',{secure: true, cache: true}).database('lazyboy_tests');
var db = module.exports.db = db_connection.connection(); //new (cradle.Connection)().database('lazyboy_tests');


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



