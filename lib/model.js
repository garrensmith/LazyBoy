var async = require('async'),
    Saveable = require('./base').Saveable,
    Removeable  = require('./base').Removeable,
    Queriable = require('./query'),
    db_helper = require('./connection'),
    logger = require('./logger');

var defined_models = {};

var Document = function () {
  var self =  this;
  
  this.serialise = function () {
    var self = this;
    var serialised_doc = {};
    
    serialised_doc.dateCreated = self.dateCreated;
    serialised_doc.lastUpdated = self.lastUpdated;
    serialised_doc.model_type = self.model_type;


    // refactor to run through schema
    Object.keys(self.schema).forEach(function (key) {
       
      /*
      var typeof_key = typeof(self[key]);
      
      if (typeof_key === 'function' || typeof_key === 'object') {

        if (self[key].id) {
          serialised_doc[key.toLowerCase() + '_id'] = self[key].id
        }
        return;
      }*/

      if (self.schema[key].type.has_one) {
        return serialised_doc[key] = self[key].serialise();
      }

      serialised_doc[key] = self[key] 
    });

    return serialised_doc;
  };

};

Saveable.call(Document.prototype);
Removeable.call(Document.prototype);

var ModelDocument = function (model_type, schema, views) {

  var self = this;
  var base = self;

  self.model_type = model_type;
  self.schema = schema;
  self.views = views;

  this.beforeSave = function (fn) {
    self.beforeSaveFn = fn;
  };

  this.afterSave = function (fn) {
    self.afterSaveFn = fn;
  };

  this.beforeCreate = function (fn) {
    self.beforeCreateFn = fn;
  };

  this.addView = function (view_name, view) {
    self.views[view_name] = view;
  };

  this.view = function (view_name, options, cb) {
    if (cb) {
      this._view(self.model_type + '/' + view_name, options, cb);
    } else {
      this._view(self.model_type + '/' + view_name, options);
    }
  };
  
  self.create = function (model_data) { 
    logger.info("Create model %s for %s", self.schema, model_data);

    var model = new Document();

    // TODO put into constructor
    model.beforeSaveFn = self.beforeSaveFn;
    model.afterSaveFn = self.beforeAfterFn;
    model.schema = self.schema;
    model.model_type = self.model_type;

    // TODO convert to correct type if needed
    for (key in self.schema) { 
      if (model_data.hasOwnProperty(key)){
        if (self.schema[key].type.has_one) {
          model[key] = self.schema[key].type.has_one.create(model_data[key]);
        } else {
          model[key] = model_data[key]; 
        }
      } else {
        model[key] = schema[key].default;
      }
    }

    if (model_data._id) {
      model.id = model_data._id;
    }

    model.model_type = self.model_type;

    self.beforeCreateFn && self.beforeCreateFn(model);

    return model;
  };  
};


// Mixins http://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
Queriable.call(ModelDocument.prototype);


var Model = function (model_type) {
  var model_document = defined_models[model_type];

  if (!model_document) {
    logger.error("No schema defined for", model_type);
    throw {
      message: "Model does not exist"
    }
  }

  if (model_document.instance) {
    return model_document.instance;
  }

  model_document.instance = new ModelDocument(model_type, model_document.schema); 

  return model_document.instance;
};

Model.create_connection= function (db_name) {
  return db_helper.create_connection(db_name);
}

Model.connect = Model.create_connection;

Model.create_views = function (model_type, model_schema) {
  logger.info("creating views for %s", model_type);
  var db = db_helper.connection();

  var model_views = {};

  Object.keys(model_schema).forEach(function (property) {
    model_views[property] = {};
    model_views[property].map = 'function (doc) {if (doc.model_type === \''+model_type+'\' && doc.' +property +') { emit(doc.' +property +',doc)} }'
  });

  model_views.all = {};
  model_views.all.map = 'function (doc) { if (doc.model_type === \''+model_type+'\'){emit(null, doc)}}';

  /*
     db.save('_design/'+model_type, model_views, function (err, res) {
     if (err) {
     logger.error("Error creating views for $s %s",model_type, err);
     }
     });*/

  return model_views
};

Model.load = function () {
  logger.info("saving views");
  var db = db_helper.connection();

  Object.keys(defined_models).forEach(function (model_type) {
    var model_document = defined_models[model_type]

    db.save('_design/'+model_type, model_document.views, function (err, res) {
      if (err) {
        logger.error("Error creating views for $s %s",model_type, err);
      }
    });
  });
};


Model.define = function (model_type, model_schema) {
  var schema  = create_schema(model_schema);

  var model_document = {};
  model_document.schema = schema;
  model_document.views = Model.create_views(model_type, schema);
  model_document.instance = new ModelDocument(model_type, schema, model_document.views);

  defined_models[model_type] = model_document;

  logger.info("Defined schema  %s for %s", schema, model_type); 

  return model_document.instance
};

function create_schema(model_schema) {
  for (key in model_schema) {
    if (model_schema[key].hasOwnProperty('type')) {
      if (!model_schema[key].hasOwnProperty('default')) {
        model_schema[key].default = undefined;
      }
    } else {
      model_schema[key] = {
        type: model_schema[key],
        default: undefined
      };
    }
  };

  return model_schema;
};


//  ----- For testing -------
Model.remove_models = function () {
  defined_models = {};
};

Model.dump = function () {
  console.dir(defined_models);
};



module.exports = Model;
