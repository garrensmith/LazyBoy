var LazyBoy = require('../lib/index'),
    specHelper = require('./spec_helper'),
    _ = require('underscore'),
    assert = require('assert');


describe('Using Backbone Model extend', function () {
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
          }
         },

        autoViews: false
      });
      done();
    });
  });

  it("Should create instance", function () {
    var newBlog = new Blog({title: 'new post', date: new Date()});
    newBlog.get('title').should.equal('new post');
  });

  it("Should have backbone model events", function (done) {
    var newBlog = new Blog({title: 'new post 2', date: new Date()});

    newBlog.on('change', function (model) {
      model.get('title').should.equal('boom');
      done();
    });

    newBlog.set({title: 'boom'});
  });

  it("Should save to Couchdb with promise", function (done) {
    var newBlog = new Blog({title: 'new post 3', date: new Date()});
    var promise = newBlog.save();

    promise.then(function (model) {
      assert.notEqual(newBlog.id, null);
      done();
    });

    promise.fail(function (err) {
      done(err);
    });
  });

  it("Should save and return callback", function (done) {
    var newBlog = new Blog({title: 'new post 4', date: new Date()});

    newBlog.save(function (err, model) {
      if (err) {
        return done(err);
      }

      assert.notEqual(newBlog.id, null);
      done();
    });

  });

  it("Should update and return callback", function (done) {
    var newBlog = new Blog({title: 'new post 5', date: new Date()});

    newBlog.save(function (err, model) {
      if (err) {
        return done(err);
      }

      model.set({title: 'update post again'});

      model.save(function (err, model) {
        if (err) {
          return done(err.description);
        }

        assert.equal(newBlog.get('title'), 'update post again');
        assert.equal(_.keys(newBlog.toJSON()).length, 5);
        done();
      });
    });

  });

  it("Should update and return promise", function (done) {
    var newBlog = new Blog({title: 'new post 5', date: new Date()});

    newBlog.save().then(function (model) {
      model.set({title: 'update post 5'});

      return model.save().then(function (model) {
        assert.equal(newBlog.get('title'), 'update post 5');
        assert.equal(_.keys(newBlog.toJSON()).length, 5);
        done();
      }, function (err) {
        done(err.description);
      });
    });

  });

});
