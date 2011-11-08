var assert = require('assert'),
    describe = require('Jody').describe,
    Model = require('../lib/index');

/*
describe("Model Validations", function (spec) {

  spec.beforeAll(function (done) {
    var Mailer = Model.define("Mailer", {
        name: String,
        email: String
    });

    Model.define("MailerZ", {
        name: String,
        email: String
    });

    
    Model.load();
    done();
  });

  spec.it("Should send error to callback length of email property to small", function (async) {
    var Mailer = Model('Mailer');

    Mailer.validate(function (check, item) {
      check(item.email).isEmail();
      check(item.name).len(0,30);
    });

    var mail1 = Mailer.create({name: "Garren", email: "Boom"});

    mail1.save(function (err, saved) {
      
      err.should().beEqual("Error: Invalid email");
      assert.equal(saved, undefined);
    });

  });

  spec.it("Should not save model to db if validation fails", function (async) {
    var Mailer = Model('Mailer');
    
    console.log("caller again");

    Mailer.validate(function (check, item) {
      check(item.email).isEmail();
      check(item.name).len(0,30);
    });

    var mail1 = Mailer.create({name: "Harris", email: "Boom"});

    mail1.save(async(function (err, saved) {
      Mailer.where("name", "Harris", async(function (err, mailers) {
        err.error.should().beEqual("not_found");

      }));
    }));
  });

  spec.it("should still save if not validation method defined", function (async) {
    var MailerZ = Model("MailerZ");

    var mailZ = MailerZ.create({name: "Magnus", email: "Boom"});
    console.log("called");
    
    mailZ.save(async(function (err, saved) {
      if (err) throw err;
      console.log("saving");
      //MailerZ.where("name", "Magnus", async(function (err, mailers) {
      //  mailers.length.should().beEqual(1);
      //}));
    }));
  });

});

*/
