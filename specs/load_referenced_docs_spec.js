var describe = require('Jody').describe,
    cradle = require('cradle'), Model = require('../lib/index'),
    db;

describe("Loading model with referenced models").
beforeAll(function (done) {
  db = new(cradle.Connection)().database('lazyboy_tests');
  
  var Author = Model.define('Author', {
    name: String,
    surname: String
  });
  
  var Book = Model.define('Book', {
    title: String,
    author: {has_one: Author}
  });

  Model.load();

  var book = Book.create({title: "Chasm City", author: Author.create({name: "Alastair", surname: "Reynolds"})});
  
  book.save(function () {
    done();
  });

}).
it("Should load embedded document", function (async) {
  var Book = Model('Book');
  Book.where("title", "Chasm City", async(function (err, books) {
    var book = books[0];
    console.dir(book);
    book.author.name.should().beEqual("Alastair");
    book.author.surname.should().beEqual("Reynolds");

  }));

});

