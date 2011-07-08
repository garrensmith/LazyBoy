var describe = require('Jody').describe,
    Model = require('../lib/index'),
    assert = require('assert');

describe('Create Model').
  beforeEach(function (done) {
    Model.remove_models();
    done();
  }).
  it("should be created with supplied parameters", function() {
    Model.define('User', {
      name: String,
    });
    var user = Model('User').create({name: "Jimi"});

    user.name.should().beEqual("Jimi");

  }).
  it("Should create basic model given basic details", function () {
    var user = Model.define('User', {
        id: String,
        name: String,
        surname: String,
    });

    var raw_user = {
      id: "garren-smith",
      name: "Garren",
      surname: "Smith"
    };

    var created_user = Model('User').create(raw_user);
    
    created_user.name.should().beEqual('Garren');
    created_user.surname.should().beEqual('Smith');

  }).
  it("Should Supply defaults for unsupplied values", function () {
    var user = Model.define('User', {
      name: String,
      surname: String,
      age: {type: String, default:"3"}
    });

    var raw_user = {
      name: "Garren",
      surname: "Smith"
    };

    var created_user = Model('User').create(raw_user);
 
    created_user.name.should().beEqual('Garren');
    created_user.surname.should().beEqual('Smith');
    created_user.age.should().beEqual('3');

  }).
  it("Should create new model object with supplied values", function() {
    Model.define('User', {
      name: String,
      surname: String,
      age: String
    });

    var user = Model('User').create({name:"Kurt",surname: "Cobain", age: 31}); 
    
    user.name.should().beEqual("Kurt");
    user.surname.should().beEqual("Cobain");
    user.age.should().beEqual(31);

  }).
  it("Should contain undefined propety if no default defined", function () {
    var user = Model.define('User', {
      name: String,
      surname: String,
      age: String
    });

    var raw_user = {
      name: "Garren",
      surname: "Smith"
    };

    var created_user = Model('User').create(raw_user);
 
    created_user.name.should().beEqual('Garren');
    created_user.surname.should().beEqual('Smith');
    assert.equal(created_user.age, undefined);

  });
