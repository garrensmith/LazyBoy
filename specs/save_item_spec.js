var assert = require('assert'),
    describe = require('Jody').describe,
    cradle = require('cradle'),
    Model = require('../lib/index'),
    db;

describe("Saving Item").
beforeAll(function (done) {
  db = new(cradle.Connection)().database('lazyboy_tests');

  Model.define('User', {
  //  id: String,
    name: String,
    surname: String,
  });

  done();

  Model.load();
}).
it("Should save item into db", function (async) {
  
  var user = Model('User').create({
    id : "EddieVedder",
    name : "Eddie",
    surname : "Vedder"
  });

  
  user.save(async(function (err, result) {
    if (err) throw err;
    
    db.get(user.id,async(function (err, loaded_user) {
      loaded_user.name.should().beEqual(user.name);
      loaded_user.surname.should().beEqual(user.surname);
    }));

  }));
}).
it("Should create id for model if not defined", function (async) {
    Model.define('User_no_id', {
    id: String,
    name: String,
    surname: String,
  });

  var user = Model('User_no_id').create({name: "John", surname: "Rambo"});

  user.save(async(function (err, user_loaded) {
    assert.notEqual( user_loaded.id, undefined);
    user_loaded.name.should().beEqual(user.name);
  }));


}).
it("Should have a model type", function (async) {
  var user = Model('User').create({
    id : "Jimmy",
    name : "Jimmy",
    surname : "Page"
  });

  user.model_type.should().beEqual("User");

  user.save(async(function (err, result) {
    if (err) {
      console.dir(err);
      throw err;      
    }

    db.get(user.id,async(function (err, loaded_user) {
      loaded_user.model_type.should().beEqual("User");

    }));

  }));

}).
it("Should have a created date", function (async) {
  
  var user = Model('User').create({
    id : "Jimi",
    name : "Jimi",
    surname : "Hendrix"
  });

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
    
