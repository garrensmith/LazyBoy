var db = require('./spec_helper').db,
    cradle = require('cradle'), 
    Model = require('../lib/index');

describe("Loading model with referenced models", function () {
  before(function (done) {

    var called = false;
    var Author = Model.define('Author', {
      name: String,
        surname: String
    });

    var Book = Model.define('Book', {
      title: String,
        author: {has_one: Author}
    });

    Model.load(function () {

      var book = Book.create({title: "Chasm City", author: Author.create({name: "Alastair", surname: "Reynolds"})});

      book.save(function () {
        if (called === false) {
          done();
          called = true;
        }
      });
    });

  })

  it("Should load embedded document", function (done) {
    var Book = Model('Book');
    Book.where("title", "Chasm City", function (err, books) {
      var book = books[0];
      book.author.name.should.equal("Alastair");
      book.author.surname.should.equal("Reynolds");
      done();

    });

  });

});
