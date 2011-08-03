var describe = require('Jody').describe,
    assert = require('assert'),
    cradle = require('cradle'),
    Model = require('../lib/index'),
    BlogPost, Comment;

describe("Saving multiple embedded docs").
  beforeAll(function (done) {
    db = new(cradle.Connection)().database('lazyboy_tests');

    Comment = Model.define("Comment", {
      name: String,
      text: String
    });
    
    BlogPost = Model.define("BlogPost", {
      title: String,
      comments: {has_many: Comment}
    });

    Model.load();
    done();

  }).
  it("Should save all embedded docs in doc as array", function (async) {
    var blog_post = BlogPost.create({title: "Cool blog Post", comments: []});
   
    blog_post.comments.push(Comment.create({name:"Garren", text: "Nicely done"}));
    blog_post.comments.push(Comment.create({name:"Billy", text: "What the hell? this doesn't make sense"}));
    
    blog_post.save(async(function (err, res) {
      db.get(res.id, async( function (err, doc) {
        doc.comments.length.should().beEqual(2);
      }));
    }));
  }).
  it("Should serialise each each embedded doc", function (async) {
    var blog_post = BlogPost.create({title: "Another blog Post", comments: []});
      
    blog_post.comments.push(Comment.create({name:"Kirsty", text: "Wow"}));
    blog_post.comments.push(Comment.create({name:"James", text: "Here is a random comment"}));
    
    blog_post.save(async(function (err, res) {
      db.get(res.id, async( function (err, doc) {
        assert.equal(doc.comments[0].schema, null);
      }));
    }));
  }).
  it("Should load embedded docs", function (async) {
    var blog_post = BlogPost.create({title: "A third blog Post", comments: []});
      
    blog_post.comments.push(Comment.create({name:"Henry", text: "Cool"}));
    blog_post.comments.push(Comment.create({name:"Wallace", text: "Awesome"}));
    
    blog_post.save(async(function (err, res) {
      BlogPost.find(res.id, async(function (err, loaded) {
        loaded.comments.length.should().beEqual(2);
        assert.notEqual(loaded.comments[0].schema, null);
      }));
    }));
  }).
  it("Should save embedded doc as empty array if not supplied", function (async) {
    var blog_post = BlogPost.create({title: "A third blog Post"});
   
    blog_post.save(async(function (err, res) {
      BlogPost.find(res.id, async(function (err, loaded) {
        loaded.comments.length.should().beEqual(0);
      }));
    }));
  });





