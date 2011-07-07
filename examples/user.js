var Model = require('../lib/index.js');

var User = Model.define('User', {
  id: String ,
  name:{ type: String, default: 'Boom'},
  surname: String
});

User.find("garren", function (err, user) {
   console.log("Name: " + user.name);
   console.log("Surname: " + user.surname);
});

User = Model('User');
User.find("garren", function (err, user) {
   console.log("Name: " + user.name);
   console.log("Surname: " + user.surname);
});

User = Model.User;
User.find("garren", function (err, user) {
   console.log("Name: " + user.name);
   console.log("Surname: " + user.surname);
});


