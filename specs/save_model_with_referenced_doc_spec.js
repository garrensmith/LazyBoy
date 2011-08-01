var cradle = require('cradle'),
    describe = require('Jody').describe,
    Model = require('../lib/index.js'),
    db;

/*
describe("Embedding documents").
  beforeAll(function (done) {
    db = new(cradle.Connection)().database('lazyboy_tests');


    var Address = Model.define("Address", {
                                            street_name: String,
                                            number: Number
                                        });

    var Person = Model.define("Person",{ 
                                         name: String,
                                         address: {hasone: Address}
                                      });

    Model.load();

    
    done();
  }).
  it("Should save main document with referenced id for embedded doc", function (async) {
    var Address = Model('Address');
    var Person = Model('Person');
    
    var new_address = Address.create({ 
                                      street_name: "Cool Str",
                                      number: 24
                                  });

    var new_person = Person.create({name: "John Malkovich", address: new_address});
    
    new_person.save(async(function (err, saved_person) {
      db.get(saved_person.id, async(function (err, person_doc) {
        Address.where("street_name","Cool Str", async(function (err, addresses) {
          var address = addresses[0];
          console.dir(address);
          person_doc.address_id.should().beEqual(address.id);
        
        }));
      }));
    }));
 
  }).
  it("Should load model and referenced model", function (async) {
    var Person = Model('Person');
    var Address = Model('Address');
    
    var new_address = Address.create({ 
                                      street_name: "Main Str",
                                      number: 21
                                  });

    var new_person = Person.create({name: "Bruce Willis", address: new_address});
    
    new_person.save(async(function (err, res) {
      if (err) throw err;

      Person.find(res.id, async(function (err, loaded_person) {
          //console.dir(loaded_person);
          loaded_person.name.should().beEqual(new_person.name);
          loaded_person.address.id.should().notBeEqual(null);
          loaded_person.address.street_name.should().beEqual(new_person.address.street_name);
          loaded_person.address.number.should().beEqual(new_person.address.number);
        }));

      }));                        
    });

    */

