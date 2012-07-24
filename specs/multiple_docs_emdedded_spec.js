var assert = require('assert'),
    cradle = require('cradle'),
    Model = require('../lib/index'),
    db = require('./spec_helper').db,
    BlogPost, Comment;

describe("Saving multiple embedded docs", function () {
  before(function (done) {

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

  })

  it("Should save all embedded docs in doc as array", function (done) {
    var blog_post = BlogPost.create({title: "Cool blog Post", comments: []});

    blog_post.comments.push(Comment.create({name:"Garren", text: "Nicely done"}));
    blog_post.comments.push(Comment.create({name:"Billy", text: "What the hell? this doesn't make sense"}));

    blog_post.save(function (err, res) {
      db.get(res.id, function (err, doc) {
        doc.comments.length.should.equal(2);
        done();
      });
    });
  })

  it("Should serialise each each embedded doc", function (done) {
    var blog_post = BlogPost.create({title: "Another blog Post", comments: []});

    blog_post.comments.push(Comment.create({name:"Kirsty", text: "Wow"}));
    blog_post.comments.push(Comment.create({name:"James", text: "Here is a random comment"}));

    blog_post.save(function (err, res) {
      db.get(res.id, function (err, doc) {
        assert.equal(doc.comments[0].schema, null);
        done();
      });
    });
  })

  it("Should load embedded docs", function (done) {
    var blog_post = BlogPost.create({title: "A third blog Post", comments: []});

    blog_post.comments.push(Comment.create({name:"Henry", text: "Cool"}));
    blog_post.comments.push(Comment.create({name:"Wallace", text: "Awesome"}));

    blog_post.save(function (err, res) {
      BlogPost.find(res.id, function (err, loaded) {
        loaded.comments.length.should.equal(2);
        assert.notEqual(loaded.comments[0].schema, null);
        done();
      });
    });
  })

  it("Should save embedded doc as empty array if not supplied", function (done) {
    var blog_post = BlogPost.create({title: "A third blog Post"});

    blog_post.save(function (err, res) {
      BlogPost.find(res.id, function (err, loaded) {
        loaded.comments.length.should.equal(0);
        done()
      });
    });
  });
});




