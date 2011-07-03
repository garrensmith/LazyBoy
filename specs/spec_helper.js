var db_connection = require('../lib/connection.js'),
    cradle = require('cradle');

require('Jody').configure.beforeAll(function (done) {
      var db = new(cradle.Connection)().database('lazyboy_tests');
      db.destroy(function () {  
        db.create();
        db_connection.create_connection('lazyboy_tests');
        done();   
      });
});





