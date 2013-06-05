var base = require('./base'),
    connection = require('./connection'),
    Model = require('./model');

//module.exports = Model;

var Backbone = require('backbone'),
    _ = require('underscore'),
    Q = require('Q'),
    db;

module.exports.config = function (opts) {
  if (typeof(opts) === 'string') {
    db = require('nano')(opts);
  }

  return db;
};

var LazyBoy = function () {
  Backbone.Model.apply(this, arguments);

  this.set({type: this.modelName}, {silent: true});
};

LazyBoy.addViews = function (attrs) {
 var autoViews = attrs.autoViews || true,
      deferred = Q.defer(),
      ddoc = {
        _id: '_design/' + attrs.modelName,
        views: {},
        language: "javascript"
      };

  if (autoViews) {
    // load default
  }

  if (attrs.views) {
    _.each(attrs.views, function (view, viewName) {
      ddoc.views[viewName] = view;
    }, this);
  }

  db.insert(ddoc, ddoc._id, deferred.makeNodeResolver());

  return deferred.promise;
};

LazyBoy.view = function (view, p) {
  var deferred = Q.defer(),
      viewParams = p || {},
      ddoc = this.prototype.modelName,
      params = _.extend({reduce: false}, viewParams);

  if (!params.reduce) { params.include_docs = true; }

  db.view(ddoc, view, params, function (err, result) {
    if (err) {
      return deferred.reject(err);
    }

    deferred.resolve(result.rows);
  });

  return deferred.promise; 
};


LazyBoy.extend = function (attrs) {
  var Model = Backbone.Model.extend.apply(this, arguments);

  LazyBoy.addViews(attrs);
  Model.view = LazyBoy.view;

  return Model;
};

_.extend( LazyBoy.prototype, Backbone.Model.prototype, {

  // TODO: expand this to better represent Backbone.Model.Save
  save: function (callback) {
    var _callback = arguments[arguments.length -1];

    var options = {}; //_.extend({}, _opts);

    if (_callback) {
      options.success = function (model) {
        return _callback(null, model);
      };

      options.error = function (err) {
        return _callback(err, null);
      };
    }

    return Backbone.Model.prototype.save.apply(this, [null, options]);
  },

  ddocName: function () {
    return '_design/' + this.get('type');
  },

});

Backbone.sync = function (method, model, options) {
  var defer = Q.defer();

  var saveAndUpdateCb = function (err, rsp) {
    if (err) {
      options.error(err);
      return defer.reject(err);
    }

    model.set({id: rsp.id, _rev: rsp.rev});
    options.success(model.toJSON());
    defer.resolve(model);
  };

  if (method === 'create') {
    db.insert(model.toJSON(), saveAndUpdateCb);

  } else if (method === 'update') {
    db.insert(model.toJSON(), model.id, saveAndUpdateCb);
  }

  return defer.promise;
};


module.exports.Model = LazyBoy;
module.exports.connection = connection;

/*var Blog = LazyBoy.Model.extend({
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

defaultViews: false;
});

var blog = new Blog({title: 'hi', date: new Date()});

blog.save();*/



