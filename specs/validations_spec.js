var assert = require('assert'),
    describe = require('Jody').describe,
    Model = require('../lib/index');


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

    
    Model.load(function () {});
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
      
      err[0].should().beEqual("Invalid email");
      assert.equal(saved, undefined);
    });

  });

  spec.it("Should not save model to db if validation fails", function (async) {
    var Mailer = Model('Mailer');

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
    console.log("validation spec called");
    
    mailZ.save(async(function (err, saved) {
      if (err) throw err;
      MailerZ.where("name", "Magnus", async(function (err, mailers) {
        mailers.length.should().beEqual(1);
      }));
    }));
  });

  spec.it("Should return list of validation errors", function (async) {
    
    var Mailer = Model('Mailer');
    Mailer.validate(function (check, item) {
      check(item.name).len(10,30);
      check(item.email).isEmail();
      
    });

    var mail1 = Mailer.create({name: "Harris", email: "Boom"});
    mail1.save(function (err, item) {
      
      err.length.should().beEqual(2);
    });

  });

  spec.it("Should return an array of error if exception occurs in validation", function () {
    var Mailer = Model('Mailer');
    Mailer.validate(function (check, item) {
      throw "Weird error here" 
    });

    var mail1 = Mailer.create({name: "Harris", email: "Boom"});
    mail1.save(function (err, item) {
      
      err.length.should().beEqual(1);
      err[0].should().beEqual("Weird error here");
    });

  });

});


