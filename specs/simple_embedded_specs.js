var assert = require('assert'),
    cradle = require('cradle'),
    Model = require('../lib/index'),
    db = require('./spec_helper').db, 
    Owner, AddressBook;

describe("Simple Embedding of Single Doc", function () {
  before(function (done) {
    Owner = Model.define("Owner", {
      name: String
    });

    AddressBook = Model.define("AddressBook", {
      name: String,
                owner: {has_one: Owner}
    });

    Model.load(function () { done(); });

  })

  it("Should save doc with embedded ref", function (done) {

    var address_book = AddressBook.create({name: "My Address Book", owner: Owner.create({name: "Harry Potter"})});

    address_book.save(function (err, res) {
      db.get(res.id,function (err, doc) {
        doc.owner.name.should.equal("Harry Potter");
        done();
      });
    });
  })

  it("Should serialize all embedded objects as well", function (done) {
    var address_book = AddressBook.create({name: "Another Address Book", owner: Owner.create({name: "Severus Snape"})});

    address_book.save(function (err, res) {
      db.get(res.id,function (err, doc) {
        assert.equal(doc.owner.schema, null);
        done();
      });
    });

  })

  it("Should load embedded doc", function (done) {
    var address_book = AddressBook.create({name: "Address Book to get loaded", owner: Owner.create({name: "Dumbledore"})});

    address_book.save(function (err, res) {

      AddressBook.find(res.id,function (err, loaded) {
        loaded.owner.name.should.equal("Dumbledore");
        assert.notEqual(loaded.owner.schema, null);
        done();
      });

    });  

  })

  it("Should save doc with null if no embedded doc and load with empty object", function (done) {
    var address_book = AddressBook.create({name: "Address Book with no owner"});

    address_book.save(function (err, res) {

      AddressBook.find(res.id,function (err, loaded) {
        loaded.owner.model_type.should.equal('Owner');
        assert.equal(loaded.owner.name, null);
        done();
      });
    });
  });
});
