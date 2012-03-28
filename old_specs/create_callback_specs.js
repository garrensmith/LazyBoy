var describe = require('Jody').describe,
    Model = require('../lib/index');

describe("Before Create Callback").
  beforeAll(function (done) {
    Model.define('Guitar',{name: String,
                           rating: Number,
                           year: Date
                          });

    done();
                           
  }).
  it("Should be called on creation of new model object", function (async) {
    var Guitar =  Model('Guitar');
    
    Guitar.beforeCreate(function (guitar) {
      guitar.name.should().beEqual("Fender Telecaster");
      guitar.name = "Gibson Custom";
    });

    var create_guitar = Guitar.create({name: "Fender Telecaster", rating: 10, year: new Date(1963,01,01)});
    
    create_guitar.name.should().beEqual("Gibson Custom");

  }).
  it("Should only get called for defined model", function () {
    var Piano = Model.define('Piano',{name: String, year: Date});
    
    var Guitar =  Model('Guitar');
    

    Guitar.beforeCreate(function (guitar) {
      guitar.name = "Gibson Custom";
    });

    var piano = Piano.create({name: "Yamaha", date: Date.now()});

    piano.name.should().beEqual("Yamaha");
 
  }).
  it("Should only be called once when object created", function (async) {
    var call_count = 0;
    var Guitar =  Model('Guitar');
    
    Guitar.beforeCreate(function (guitar) {
      //guitar.name = "Gibson Custom";
      call_count += 1;
    });

    var fender = Guitar.create({name: "Fender Stratocaster", rating: 5, year: new Date(1990,04,05)});

    call_count.should().beEqual(1);

    fender.save(async(function (err, res) {
      call_count.should().beEqual(1);

      Guitar.find(res.id, async(function (err, loaded_fender) {
        call_count.should().beEqual(1);
      }));
    }));



  });
