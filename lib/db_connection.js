var cradle = require('cradle');

var db;

function create_connection() {


  return db;
};


module.exports.connection = function () {

  return db || create_connection();

};


