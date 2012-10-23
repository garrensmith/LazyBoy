var  Model = require('../lib/index'),
     db = require('./spec_helper.js').db;

describe("Before Create Callback", function () {
  before(function (done) {
    Model.define('Guitar',
      {name: String,
        rating: Number,
        year: Date
      });

    Model.load( function () {
      done();
    });

  })

  it("Should be called on creation of new model object", function () {
    var Guitar =  Model('Guitar');

    Guitar.beforeCreate(function (guitar) {
      guitar.name.should.equal("Fender Telecaster");
      guitar.name = "Gibson Custom";
    });

    var create_guitar = Guitar.create({name: "Fender Telecaster", rating: 10, year: new Date(1963,01,01)});

    create_guitar.name.should.equal("Gibson Custom");

  })

  it("Should only get called for defined model", function () {
    var Piano = Model.define('Piano',{name: String, year: Date});

    var Guitar =  Model('Guitar');


    Guitar.beforeCreate(function (guitar) {
      guitar.name = "Gibson Custom";
    });

    var piano = Piano.create({name: "Yamaha", date: Date.now()});

    piano.name.should.equal("Yamaha");

  })

  it("Should only be called once when object created", function (done) {
    var call_count = 0;
    var Guitar =  Model('Guitar');

    Guitar.beforeCreate(function (guitar) {
      //guitar.name = "Gibson Custom";
      call_count += 1;
    });

    var fender = Guitar.create({name: "Fender Stratocaster", rating: 5, year: new Date(1990,04,05)});

    call_count.should.equal(1);

    fender.save(function (err, res) {
      call_count.should.equal(1);

      Guitar.find(res.id, function (err, loaded_fender) {
        call_count.should.equal(1);
        done();
      });
    });
  });

});

