var describe = require('Jody').describe,
    Model = require('../lib/index'),
    db_helper = require('../lib/connection');

describe("Getting all models").
beforeAll(function (done) {
    Model.define("Blog", {title: String, content: String});

    var Blog = Model("Blog");

    Blog.create({title:"First Blog", content:"This is my first blog post"}).save(function (){
      Blog.create({title:"Second Blog post",content:"This is my second blog post"}).save(function () {
        done();
      });

    });

  }).
  it("Should return all documents for Model", function (async) {
    var Blog = Model("Blog");
      
    Blog.all(async(function(err, blogs) {
      console.log("Bloogs");
      console.dir(blogs);
      blogs.length.should().beEqual(2);
    }));
  }).
  it("Should only find documents related to model", function (async) {
    var Blog = Model("Blog");

    Model.define("User", {name: String, surname: String});

    var User = Model("User");

    User.create({name:"Ben", surname:"Harper"}).save(async(function (){
      
      Blog.all(async(function(err, blogs) {
        console.log("Bloogs");
        console.dir(blogs);
        blogs.length.should().beEqual(2);
      }));

    }));
  });

