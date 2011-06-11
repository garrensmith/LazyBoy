var describe = require('Jody').describe,
    Model = require('../lib/index'),
    assert = require('assert');




describe('Create Model').
  beforeEach(function (done) {
    Model.remove_models();
  }).
  it("Should create basic model given json", function () {
    var user = Model('User', {
        name: String,
        surname: String,
    });

    var raw_user = {
      name: "Garren",
      surname: "Smith"
    };

    var created_user = Model.load('User',raw_user);
    
    created_user.name.should().beEqual('Garren');
    created_user.surname.should().beEqual('Smith');

  }).
  it("Should Supply defaults for unsupplied values", function () {
    var user = Model('User', {
      name: String,
      surname: String,
      age: {type: String, default:"3"}
    });

    var raw_user = {
      name: "Garren",
      surname: "Smith"
    };

    var created_user = Model.load('User',raw_user);

    console.dir(created_user);
    Model.dump();
 
    created_user.name.should().beEqual('Garren');
    created_user.surname.should().beEqual('Smith');
    created_user.age.should().beEqual('3');

  }).
  it("Should undefined propety if no default defined", function () {
    var user = Model('User', {
      name: String,
      surname: String,
      age: String
    });

    var raw_user = {
      name: "Garren",
      surname: "Smith"
    };

    var created_user = Model.load('User',raw_user);
 
    created_user.name.should().beEqual('Garren');
    created_user.surname.should().beEqual('Smith');
    assert.equal(created_user.age, undefined);

  });
