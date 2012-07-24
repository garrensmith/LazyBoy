var assert = require('assert'),
    db = require('./spec_helper').db,
    Model = require('../lib/index');


describe("Model Validations", function () {

  before(function (done) {
    var Mailer = Model.define("Mailer", {
      name: String,
        email: String
    });

    Model.define("MailerZ", {
      name: String,
      email: String
    });

    var called = false;
    Model.load(function () {});
    if (!called) {
      done();
      called = true;
    }
  });

  it("Should send error to callback length of email property to small", function () {
    var Mailer = Model('Mailer');

    Mailer.validate(function (check, item) {
      check(item.email).isEmail();
      check(item.name).len(0,30);
    });

    var mail1 = Mailer.create({name: "Garren", email: "Boom"});

    mail1.save(function (err, saved) {

      err[0].should.equal("Invalid email");
      assert.equal(saved, undefined);
    });

  });

  it("Should not save model to db if validation fails", function (done) {
    var Mailer = Model('Mailer');

    Mailer.validate(function (check, item) {
      check(item.email).isEmail();
      check(item.name).len(0,30);
    });

    var mail1 = Mailer.create({name: "Harris", email: "Boom"});

    mail1.save(function (err, saved) {
      Mailer.where("name", "Harris", function (err, mailers) {
        err.error.should.equal("not_found");
        done();

      });
    });
  });

  it("should still save if not validation method defined", function (done) {
    var MailerZ = Model("MailerZ");

    var mailZ = MailerZ.create({name: "Magnus", email: "Boom"});

    mailZ.save(function (err, saved) {
      if (err) throw err;
      MailerZ.where("name", "Magnus", function (err, mailers) {
        mailers.length.should.equal(1);
        done();
      });
    });
  });

  it("Should return list of validation errors", function (done) {

    var Mailer = Model('Mailer');
    Mailer.validate(function (check, item) {

      check(item.name).len(10,30);
      check(item.email).isEmail();

    });

    var mail1 = Mailer.create({name: "Harris", email: "Boom"});
    mail1.save(function (err, item) {

      err.length.should.equal(2);
      done();
    });

  });

  it("Should return an array of error if exception occurs in validation", function () {
    var Mailer = Model('Mailer');
    Mailer.validate(function (check, item) {
      throw "Weird error here" 
    });

    var mail1 = Mailer.create({name: "Harris", email: "Boom"});
    mail1.save(function (err, item) {

      err.length.should.equal(1);
      err[0].should.equal("Weird error here");
    });

  });

});



