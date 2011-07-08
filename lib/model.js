var Base = require('./base');


var defined_models = {};

var ModelFactory = function (model_name, schema) {
  var self = this;

  self.model_name = model_name;
  self.schema = schema;

  self.create = function (model_data) {    
    var model = {};

    for (key in self.schema) { 
      if (model_data.hasOwnProperty(key)){
        model[key] = model_data[key]; 
      } else {
        model[key] = schema[key].default;
      }
    }
    return model;
  }
};

var Model = function (model_name) {
  var schema = defined_models[model_name];

  if (!schema) {
    throw {
      message: "Model does not exist"
    }
  }
  return new ModelFactory(model_name, schema); 
};

Model.define = function (model_name, model_object) {
  defined_models[model_name] = create_schema(model_object);

  return Base;
};

function create_schema(model_object) {
  for (key in model_object) {
    if (model_object[key].hasOwnProperty('type')) {
      if (!model_object[key].hasOwnProperty('default')) {
        model_object[key].default = undefined;
      }
    } else {
      model_object[key] = {
        type: model_object[key],
        default: undefined
      };
    }
  };

  return model_object;
};


//  ----- For testing -------
Model.remove_models = function () {
  defined_models = {};
};

Model.dump = function () {
  console.dir(defined_models);
};

// --------------------------

function merge(schema, raw_obj) {
  for (key in schema) { 
    obj1[key] = obj2[key]; 
  }
}


module.exports = Model;
