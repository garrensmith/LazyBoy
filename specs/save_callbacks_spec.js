var db = require('./spec_helper').db,
    assert =require('assert'),
    Model = require('../lib/index');

describe('Save callback',function () {
  before(function (done) {
    Model.define('Blog',{title: String,
      post: String,
      url: String
    });

    Model.load(function () {
      done();
    });
  })


  it("should called beforeSave before Save", function (done) {
    var Blog = Model('Blog');

    Blog.beforeSave(function (blog ) {
      blog.url = blog.title.split(' ').join('-');
    });

    var blog_post = Blog.create({title: "hello world", post:"My first demo post"});

    blog_post.save(function (err, saved_blog_post) {
      saved_blog_post.url.should.equal("hello-world");
      done();
    });

  })

  it("Should call afterSave after save", function (done) {
    var Blog = Model('Blog');

    Blog.afterSave(function () {done()});

    var blog_post = Blog.create({title: "hello again", post:"My 2nd demo post"});
    blog_post.save();

  })

  it("Should not fire for different model", function (done) {
    var Blog2 = Model.define('Blog2',{title: String,
      post: String,
        url: String
    });

    var blog_post = Blog2.create({title: "hello world", post:"My first demo post",url:"boom"});

    blog_post.save(function (err, saved_blog_post) {
      saved_blog_post.url.should.equal("boom");
      done();
    });

  });

});




