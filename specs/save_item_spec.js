var describe = require('Jody').describe,
    cradle = require('cradle'),
    Model = require('../lib/index'),
    db;

describe("Saving Item").
beforeAll(function (done) {
  db = new(cradle.Connection)().database('lazyboy_tests');

  Model('User', {
    id: String,
    name: String,
    surname: String,
  });

  done();
}).
it("Should save item into db", function (async) {
  
  var user = Model.create('User');
  user.id = "EddieVedder";
  user.name = "Eddie";
  user.surname = "Vedder"

  user.save(async(function (err, result) {
    if (err) throw err;

    db.get(user.id,async(function (err, loaded_user) {
      loaded_user.name.should().beEqual(user.name);
      loaded_user.surname.should().beEqual(user.surname);
    }));

  }));
}).
it("Should create id for model if not defined", function (async) {
    Model('User_no_id', {
    id: String,
    name: String,
    surname: String,
  });
}).
it("Should have a created date", function (async) {
  
  var user = Model.create('User');
  user.id = "Jimi";
  user.name = "Jimi";
  user.surname = "Hendrix"

  user.save(async(function (err, result) {
    if (err) throw err;

    db.get(user.id,async(function (err, loaded_user) {
      var dateCreated = new Date(loaded_user.dateCreated);
      var current_time = new Date();
      dateCreated.getMinutes().should().beEqual(current_time.getMinutes());
      dateCreated.getHours().should().beEqual(current_time.getHours());
    }));

  }));

})/*.
it("Should have an update date that gets updated with each save", function (async) {
  var user = Model.create('User');
  user.id = "Jimmy";
  user.name = "Jimmy";
  user.surname = "Page"
  user.save(async(function (err, result) {
    if (err) throw err;

    db.get(user.id,async(function (err, loaded_user) {
      var first_date_modified = new Date(loaded_user.lastUpdated);
      
      setTimeout(async(function() {
      
      user.save(async(function (err, result) {
        db.get(user.id, async(function (err, loaded_user_again) {
          var second_date_modified = new Date(loaded_user_again.lastUpdated);
          second_date_modified.should().notBeEqual(first_date_modified);
        }));
      }));
    
      }), 1000);
    }));

  }));


});*/
    
