var db = require('./spec_helper').db,
    Model = require('../lib/index'),
    assert = require('assert');

describe("Defining a model", function () {
  beforeEach(function (done) {
    Model.remove_models();
    done();
  });

  it("Should contain specified schema for model after define", function () {
    var User = Model.define('User',{name:String});

    User.schema.name.type.should.equal(String);
  });

  it("Should contain specified schema for model after load", function () {
    var User = Model.define('User',{name:String});
    User = Model('User'); 

    User.schema.name.type.should.equal(String);
  });

  it("Should be seperate models", function () {
    var User = Model.define('User',{name:String});
    var Post = Model.define('Post',{title:String});

    var user = User.create({name:"garren"});
    var post = Post.create({title:"hello"});

    user.should.not.equal(post);
    User.should.not.equal(Post);
    User.schema.should.not.equal(Post.schema);
  });
});

describe('Create Model', function () {
  beforeEach(function (done) {
    Model.remove_models();
    done();
  })

  it("should be created with supplied parameters", function() {
    Model.define('User', {
      name: String,
    });
    var user = Model('User').create({name: "Barry"});

    user.name.should.equal("Barry");

  })

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

    created_user.name.should.equal('Garren');
    created_user.surname.should.equal('Smith');

  })

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

    created_user.name.should.equal('Garren');
    created_user.surname.should.equal('Smith');
    created_user.age.should.equal('3');

  })

  it("Should create new model object with supplied values", function() {
    Model.define('User', {
      name: String,
    surname: String,
    age: String
    });

    var user = Model('User').create({name:"Kurt",surname: "Cobain", age: 31}); 

    user.name.should.equal("Kurt");
    user.surname.should.equal("Cobain");
    user.age.should.equal(31);

  })


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

    created_user.name.should.equal('Garren');
    created_user.surname.should.equal('Smith');
    assert.equal(created_user.age, undefined);

  })

  it("Should handle booleans correctly", function() {
    Model.define('CareBear', {
      name: String,
    happy: {type: Boolean, default:true}
    });

    var bear1 = Model('CareBear').create({
      name: "Bear1",
        happy: false
    });

    bear1.happy.should.be.false

    var bear2 = Model('CareBear').create({
      name: "Bear2",
        happy: true
    });

  bear2.happy.should.be.true;

  var bear3 = Model('CareBear').create({
    name: "Bear1",
  });

  bear3.happy.should.be.true;
  }); 
});
