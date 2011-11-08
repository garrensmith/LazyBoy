var describe = require('Jody').describe,
    assert = require('assert'),
    cradle = require('cradle'),
    Model = require('../lib/index'),
    db, Owner, AddressBook;

describe("Simple Embedding of Single Doc").
  beforeAll(function (done) {
    db = new(cradle.Connection)().database('lazyboy_tests');

    Owner = Model.define("Owner", {
      name: String
    });
    
    AddressBook = Model.define("AddressBook", {
      name: String,
      owner: {has_one: Owner}
    });

    Model.load();
    done();

  }).
  it("Should save doc with embedded ref", function (async) {

    var address_book = AddressBook.create({name: "My Address Book", owner: Owner.create({name: "Harry Potter"})});

    address_book.save(async(function (err, res) {
      db.get(res.id,async(function (err, doc) {
        doc.owner.name.should().beEqual("Harry Potter");
      }));
    }));
  }).
  it("Should serialize all embedded objects as well", function (async) {
    var address_book = AddressBook.create({name: "Another Address Book", owner: Owner.create({name: "Severus Snape"})});
   
    address_book.save(async(function (err, res) {
      db.get(res.id,async(function (err, doc) {
        assert.equal(doc.owner.schema, null);
      }));
    }));

  }).
  it("Should load embedded doc", function (async) {
    var address_book = AddressBook.create({name: "Address Book to get loaded", owner: Owner.create({name: "Dumbledore"})});

    address_book.save(async(function (err, res) {
      
      AddressBook.find(res.id,async(function (err, loaded) {
        loaded.owner.name.should().beEqual("Dumbledore");
        assert.notEqual(loaded.owner.schema, null);

      }));
    
    }));
   
  

  }).
  it("Should save doc with null if no embedded doc and load with empty object", function (async) {
    var address_book = AddressBook.create({name: "Address Book with no owner"});

    address_book.save(async(function (err, res) {
      
      AddressBook.find(res.id,async(function (err, loaded) {
        loaded.owner.model_type.should().beEqual('Owner');
        assert.equal(loaded.owner.name, null);
      }));
    
    }));

  });
