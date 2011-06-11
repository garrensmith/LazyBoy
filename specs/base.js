var describe = require('Jody').describe,
    Model = require('../lib/index');

var user = Model('User', {
  name: String,
  surname: String
});



describe('Create Model').
  it("Should create basic model given json", function () {
    var raw_user = {
      name: "Garren",
      surname: "Smith"
    };

    var created_user = Model.load('User',raw_user);
    
    created_user.name.should().beEqual('Garren');
    created_user.surname.should().beEqual('Smith');

  });
