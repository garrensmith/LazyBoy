var db = require('./spec_helper').db,
    Model = require('../lib/index'),
    db_helper = require('../lib/connection');

describe("Getting all models", function () {
  before(function (done) {
    Model.define("Blog1", {title: String, content: String});

    var Blog = Model("Blog1");

    Model.load();

    Blog.create({title:"First Blog", content:"This is my first blog post"}).save(function (){
      Blog.create({title:"Second Blog post",content:"This is my second blog post"}).save(function () {
        done();
      });

    });

  })

  it("Should return all documents for Model", function (done) {
    var Blog = Model("Blog1");

    Blog.all(function(err, blogs) {
      blogs.length.should.equal(2);
      done();
    });
  })

  it("Should only find documents related to model", function (done) {
    var Blog = Model("Blog1");

    Model.define("User", {name: String, surname: String});

    var User = Model("User");

    Model.load();

    User.create({name:"Ben", surname:"Harper"}).save(function (){

      Blog.all(function(err, blogs) {
        blogs.length.should.equal(2);
        done();
      });

    });
  });
});
