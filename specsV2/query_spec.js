var LazyBoy = require('../lib/index'),
    specHelper = require('./spec_helper'),
    _ = require('underscore'),
    Q = require('Q'),
    assert = require('assert');


describe('Using defined views ', function () {
  var Blog;

  beforeEach(function (done) {
    specHelper.cleanDb(function (err) {

      Blog = LazyBoy.Model.extend({
        modelName: 'Blog',

        properties: {
          title: String,
          date: Date
        },

        views: {
          byDate: {
            map: function (doc) {
              if (doc['type'] === 'Blog') {
                emit(doc.date, 1);
              }
            },

            reduce: '_sum'
          },
          byAuthor: {
            map: function (doc) {
              if (doc['type'] === 'Blog') {
                emit(doc.author, 1);
              }
            },
            reduce: '_sum'
          }
        },

        autoViews: false
      });

      done();
    });
  });

  it("Should be able to get documents", function (done) {
    var newBlog1 = new Blog({title: 'new post 1', date: new Date()});
    var newBlog2 = new Blog({title: 'new post 2', date: new Date()});

    var promise1 = newBlog1.save();
    var promise2 = newBlog2.save();

    Q.all([promise1, promise2]).then(function () {
      Blog.view('byDate').then(function (results) {
        console.log('len', results.length);
        assert.equal(results.length, 2);
        done();
      }, function (err) {
        console.log('fail', err);
        done(err);
      });
    });

  });

  it("Should be able to reduce", function (done) {
    var newBlog1 = new Blog({title: 'new post 1', author: "jim", date: new Date()});
    var newBlog2 = new Blog({title: 'new post 2', author: "jim", date: new Date()});
    var newBlog3 = new Blog({title: 'new post 3', author: "harry", date: new Date()});

    var promise1 = newBlog1.save();
    var promise2 = newBlog2.save();
    var promise3 = newBlog3.save();

    Q.all([promise1, promise2, promise3]).then(function () {
      Blog.view('byAuthor', {reduce: true, key: 'jim'}).then(function (results) {
        assert.equal(results[0].value, 2);
        done(); 
      });
    });

  });
});
