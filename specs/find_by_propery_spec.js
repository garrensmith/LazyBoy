var describe = require('Jody').describe,
    Model = require('../lib/index'),
    db_helper = require('../lib/connection');

//require('../lib/index').logger.setLogLevel(7);


describe("Querying data").
  beforeAll(function (done) {
    Model.define("User", {name: String, surname: String});

    var User = Model("User");

    User.create({name:"Ben", surname:"Harper"}).save(function (){
      User.create({name:"Joshua",surname:"James"}).save(function () {
        done();
      });

    });

  }).
  it("Should create view that can be queried for first names", function (async) {
    var User = Model("User");
   /* db = db_helper.connection();    
    
    db.view('User/all',{descending:"false"} , async(function (err, doc) {
      console.log("viewing");
      console.dir(err);
      console.dir(doc);
    }));*/

    User.where("name","Ben",async(function (err, users) {
      users.length.should().beEqual(1);
      var user = users[0];
      user.name.should().beEqual("Ben");
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
  it("Should query by surname", function (async) {
    var User = Model("User");
    User.where("surname","James",async(function (err, users) {
      users.length.should().beEqual(1);
      var user = users[0];
      user.name.should().beEqual("Joshua");
      user.surname.should().beEqual("James");
    }));

  });
