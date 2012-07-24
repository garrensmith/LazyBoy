var db_connection = require('../lib/connection.js'),
    cradle = require('cradle');

//var db = module.exports.db = new (cradle.Connection)('https://garrensmith.cloudant.com','443',{secure: true}).database('lazyboy_ci_test');
var db = module.exports.db = new (cradle.Connection)().database('lazyboy_tests');


before(function(done) {
    console.log("cleaning db");
    db.get('_all_docs', function (err, res) {
        
        JSON.parse(res).forEach(function (item) {
            db.remove(item.id, item.value.rev, function (err, res) {});
        });
        db_connection.create_connection('lazyboy_tests');
        done();
    });

});



