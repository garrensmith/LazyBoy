var db_connection = require('../lib/connection.js'),
    cradle = require('cradle');
var db = module.exports.db = new (cradle.Connection)('https://garrensmith.cloudant.com','443',{secure: true}).database('lazyboy_ci_test');

require('Jody').configure.beforeAll(function (done) {

  //require('../lib/logger').setLogLevel(7);

  /*db.destroy(function (err) {  
    if (err) {
    console.log("error on delete db");
  //console.dir(err);
  }*/
  //db.create(function () {
  // db_connection.create_connection('lazyboy_ci_test');
  db_connection.create_connection({
    url: 'https://garrensmith.cloudant.com',
    port: '443',
    db:'lazyboy_ci_test',
    secure:true,
  });
  done();   
  //});
  //});
});





