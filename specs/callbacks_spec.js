var describe = require('Jody').describe,
    assert =require('assert'),
    Model = require('../lib/index');

describe('Save callback',function (spec) {
  spec.beforeAll(function (done) {
    Model.define('Blog',{title: String,
      post: String,
      url: String
    });

    Model.load(function () {

      done();
    });
  })


  spec.it("should called beforeSave before Save", function (async) {
    var Blog = Model('Blog');
    console.log("hello fromsave");
    
    Blog.beforeSave(function (blog ) {
      blog.url = blog.title.split(' ').join('-');
    });

    var blog_post = Blog.create({title: "hello world", post:"My first demo post"});

    blog_post.save(async(function (err, saved_blog_post) {
      saved_blog_post.url.should().beEqual("hello-world");
    }));

  })

  spec.it("Should call afterSave after save", function (async) {
    var Blog = Model('Blog');

    var blog_post = Blog.create({title: "hello again", post:"My 2nd demo post"});
    blog_post.save();

    Blog.afterSave(async(function (blog) {
      assert.notEqual(blog.id,null);
    }));
  })

  spec.it("Should not fire for different model", function (async) {
    var Blog2 = Model.define('Blog2',{title: String,
      post: String,
        url: String
    });

    var blog_post = Blog2.create({title: "hello world", post:"My first demo post",url:"boom"});

    blog_post.save(async(function (err, saved_blog_post) {
      saved_blog_post.url.should().beEqual("boom");
    }));



  });

});



