var describe = require('Jody').describe,
    Model = require('../lib/index');

describe('BeforeSave callback').
  it("Should be called", function (async) {
    var Blog = Model.define('Blog',{title: String,
                                    post: String,
                                    url: String
                                    });

    Blog.beforeSave(function (blog, done) {
      blog.url = title.split(' ').join('-');
      done();
    });

    var blog_post = Blog.create({title: "hello world", post:"My first demo post"});
    
    blog_post.save(async(function (err, saved_blog_post) {
      saved_blog_post.url.should().beEqual("hello-word");
    }));

  });

