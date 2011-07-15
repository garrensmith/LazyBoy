var Model = require('../lib/index.js'),
    logger = require('../lib/logger');

logger.setLogLevel(7);


Model.create_connection('lazyboy_tests');

var User = Model.define('User', {
  id: String ,
  name:{ type: String, default: 'Boom'},
  surname: String
});

var user = User.create({id: "garren", name: "Garren", surname: "Smith"})

user.save(function (err, user) {

  User.find("garren", function (err, user) {
    console.log("Name: " + user.name);
    console.log("Surname: " + user.surname);
  });

  User = Model('User');
  User.find("garren", function (err, user) {
    console.log("Name: " + user.name);
    console.log("Surname: " + user.surname);
  });

  
});


