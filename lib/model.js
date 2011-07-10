var Saveable = require('./base').Saveable,
    Queriable = require('./query'),
    db_helper = require('./connection'),
    logger = require('./logger');

var defined_models = {};

var ModelDocument = function (model_type, schema) {
  
  var self = this;

  self.model_type = model_type;
  self.schema = schema;

  self.create = function (model_data) { 
    logger.info("Create model %s for %s", self.schema, model_data);
        
    var model = new ModelDocument();

    for (key in self.schema) { 
      if (model_data.hasOwnProperty(key)){
        model[key] = model_data[key]; 
      } else {
        model[key] = schema[key].default;
      }
    }

    if (model_data._id) {
      model.id = model_data._id;
    }

    model.model_type = self.model_type;
    
    console.log("This model");
    console.dir(model);

    return model;
  };  
};

// Mixins http://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
Queriable.call(ModelDocument.prototype);
Saveable.call(ModelDocument.prototype);


var Model = function (model_type) {
  var schema = defined_models[model_type];

  if (!schema) {
    logger.error("No schema defined for", model_type);
    throw {
      message: "Model does not exist"
    }
  }
  return new ModelDocument(model_type, schema); 
};

Model.create_connection= function (db_name) {
  return db_helper.create_connection(db_name);
}

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

  
  db.save('_design/'+model_type, model_views, function (err, res) {
      if (err) {
        logger.error("Error creating views for $s %s",model_type, err);
      }
  });
 
};

Model.define = function (model_type, model_schema) {
  var schema  = create_schema(model_schema);
  defined_models[model_type] = schema;

  logger.info("Defined schema  %s for %s", schema, model_type); 

  Model.create_views(model_type, model_schema);

  return new ModelDocument(model_type, schema);
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

// --------------------------

function merge(obj1, obj2) {
  for (key in obj2) { 
    obj1[key] = obj2[key]; 
  }
}


module.exports = Model;
