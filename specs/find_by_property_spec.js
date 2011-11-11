var describe = require('Jody').describe,
    Model = require('../lib/index'),
    db_helper = require('../lib/connection');


describe("Finding by property").
  beforeAll(function (done) {
    Model.define("User", {name: String, surname: String});
    Model.load();

    var User = Model("User");

    User.create({name:"Benjamin", surname:"Harper"}).save(function (){
      User.create({name:"Joshua",surname:"James"}).save(function () {
        done();
      });

    });

  }).
  it("Should create view that can be queried for first names", function (async) {
    var User = Model("User");
      User.where("name","Benjamin",async(function (err, users) {
      users.length.should().beEqual(1);
      var user = users[0];
      user.name.should().beEqual("Benjamin");
      user.surname.should().beEqual("Harper");
    }));
  
  }).
  it("Should allow different query names", function (async) {
    var User = Model("User");
    User.where("name","Joshua",async(function (err, users) {
      users.length.should().beEqual(1);
      var user = users[0];
      user.name.should().beEqual("Joshua");
      user.surname.should().beEqual("James");
    }));
  
  }).
  it("Should return empty array if query not exist", function (async) {
    var User = Model("User");
    
    User.where("name","Henry", async(function (err, users) {
      users.length.should().beEqual(0);
    }));
  }).
  it("Should return if view not exist", function (async) {
    var User = Model("User");
    
    User.where("name123","Henry", async(function (err, users) {
      err.reason.should().beEqual("missing_named_view");
    }));
  }).
  it("Should query by surname", function (async) {
    var User = Model("User");
    User.where("surname","James",async(function (err, users) {
      users.length.should().beEqual(1);
      var user = users[0];
      user.name.should().beEqual("Joshua");
      user.surname.should().beEqual("James");
    }));
  }).
  it("Should find only for specified model", function (async) {
   var User = Model("User");
   var Another_User = Model.define('AnotherUser',{name:String});
   Model.load();
  
   Another_User.create({name:"Joshua"}).save(async(function () {
    User.where("name","Joshua", async(function (err, users) {
      users.length.should().beEqual(1);
      users[0].surname.should().beEqual("James");
    }));
   }));
  });
