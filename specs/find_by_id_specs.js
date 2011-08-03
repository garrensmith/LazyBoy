var describe = require('Jody').describe,
    cradle = require('cradle'),
    assert = require('assert'),
    Model = require('../lib/index'),
    db,
    User;
 
describe("Find document by Id").   
    beforeAll(function (done) {
       db = new(cradle.Connection)().database('lazyboy_tests');
        Model.define('User', {name: String });
        Model.load();
        
        User = Model('User');
        
       done();
    }).
    it("Should find saved document by id", function (async) {
       user_doc = {
         id : "test-user-id",
         name: "garren"
       };
       db.save(user_doc.id, user_doc,async( function (err, req) {
           if (err) throw err;
          
           User.find(user_doc.id, async(function (err, user) {
               if (err) throw err;
               console.dir(user);
               user.id.should().beEqual(user_doc.id);
               user.name.should().beEqual("garren");
           }));
       }));
 }).
    it("Should return null for no user with Id", function (async) {
        User.find("unknown", async(function (err, user) {
          err.error.should().beEqual("not_found");
          assert.equal(user, null);
        }));      
    }).
  it("Should contain update and created date", function (async) {
    User.create({name:"John Rambo"}).save(async(function (err, user) {
      User.find(user.id, async(function (err, find_user) {
      
        var current_date = new Date();
        find_user.dateCreated.getHours().should().beEqual(current_date.getHours());
        find_user.lastUpdated.getHours().should().beEqual(current_date.getHours());
      
      }));

    }));


  });

  

