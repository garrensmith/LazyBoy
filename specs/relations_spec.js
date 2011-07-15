var describe = require('Jody').describe,
    Model = require('../lib/index.js');


describe("Embedding documents").
  it("Should work", function (async) {
    var Address = Model.define("Address", {street_name: String,
                                            number: Number
                                        });

    var Person = Model.define("Person",{ name: String,
                                         address: {hasone: Address}
                                      });

    var new_address = Address.create({street_name: "Main Str",
                                      number: 21
                                      });

    var new_person = Person.create({name: "Bruce Willis", address: new_address});
    
    new_person.save(async(function (err, res) {
      if (err) throw err;

      Person.find(res.id, async(function (err, loaded_person) {
          console.dir(loaded_person);
          loaded_person.name.should().beEqual(new_person.name);
          loaded_person.address.street_name.should().beEqual(new_person.address.street_name);
          loaded_person.address.number.should().beEqual(new_person.address.number);
        }));

      }));                        
    });

