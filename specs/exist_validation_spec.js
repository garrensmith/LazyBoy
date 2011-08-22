var describe = require('Jody').describe,
    assert =require('assert'),
    Model = require('../lib/index');

describe("Validation", function (spec) {
  
  spec.beforeAll(function (done) {
    Model.define("EntryBook", {
      name: {type: String, exists:true},
      date: String
    });
    
    Model.load();
    setTimeout(function () {
      done();
    }, 100);
  });

  spec.it("Should save document if field exists", function (async) {
    var EntryBook = Model('EntryBook');

    var eb = EntryBook.create({name: "Garren Smith", date: new Date()});

    eb.save(async(function (err, saved_eb) {
      console.dir(err);
      console.dir(saved_eb);
     EntryBook.where("name","Garren Smith", async(function (err, loaded_ebs) {
       loaded_ebs[0].name.should().beEqual("Garren Smith");
     }));

    }));
      
  });


  spec.it("Should fail to save if field not exists", function (async) {
    var EntryBook = Model('EntryBook'),
        eb = EntryBook.create({date: new Date()});
    
    eb.save(async(function (err, saved_eb) {
      err.reason.should().beEqual("Document must have a name");
    }));
        
  
  });



});
