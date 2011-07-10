var Base = require('./base'),
    db_helper = require('./connection'),
    logger = require('./logger');

var defined_models = {};

var ModelFactory = function (model_type, schema) {
  
  var self = this;

  self.model_type = model_type;
  self.schema = schema;

  self.create = function (model_data) { 
    logger.info("Create model %s for %s", self.schema, model_data);

        
    var model = {};

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
    
    var base = new Base();
    merge(base, model);

    return base;
  };

  self.find = function (id, cb) {
    
    logger.info("Finding model for id %s", id);

    Base.find(id, function (err, res) {
      if (err) {
        logger.error("Cannot find item with id %s error: %s", id, err);
        return cb(err, null);
      }

      cb(null, self.create(res));
    });
  }

  self.all = function (cb) {
    var db = db_helper.connection();

    db.view(self.model_type + '/all', function (err, docs) {
      var items = [];
      
      docs.forEach(function (item) {
        items.push(self.create(item));
      });
      
      console.dir(items);
      cb(err, items);
    });

  };

  self.where = function (property, key,cb) {
    var db = db_helper.connection();

    db.view('User/'+property,{key: key}, function (err, doc) {
      var users = [];
      console.dir(doc);
      
      doc.forEach(function (user_doc) {
        console.dir(user_doc);
        users.push(self.create(user_doc));
      });
      
      console.dir(users);
      cb(err, users);
    });


  };
};

var Model = function (model_type) {
  var schema = defined_models[model_type];

  if (!schema) {
    logger.error("Not schema defined for", model_type);
    throw {
      message: "Model does not exist"
    }
  }
  return new ModelFactory(model_type, schema); 
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

  return new ModelFactory(model_type, schema);
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
