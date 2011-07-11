var describe = require('Jody').describe,
    assert =require('assert'),
    Model = require('../lib/index');

describe('Save callback').
  beforeAll(function (done) {
    Model.define('Blog',{title: String,
                                    post: String,
                                    url: String
                                    });

    done();
  }).
  it("should called beforeSave before Save", function (async) {
    var Blog = Model('Blog');


    Blog.beforeSave(function (blog ) {
      console.dir(blog);
      blog.url = blog.title.split(' ').join('-');
    });

    var blog_post = Blog.create({title: "hello world", post:"My first demo post"});
    
    blog_post.save(async(function (err, saved_blog_post) {
     console.dir(saved_blog_post);
     saved_blog_post.url.should().beEqual("hello-world");
    }));

  }).
  it("Should call afterSave after save", function (async) {
    var Blog = Model('Blog');

    var blog_post = Blog.create({title: "hello again", post:"My 2nd demo post"});
    blog_post.save();

    Blog.afterSave(async(function (blog) {
        console.log("after save");
        assert.notEqual(blog.id,null);
    }));
  });

