
var defined_models = {};

var Model = function (model_name, model_object) {
    
  defined_models[model_name] = create_schema(model_object);
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

Model.load = function(model_name, raw_model_object) {
  var model = {}
      , schema = defined_models[model_name];

  for (key in schema) { 
    if (raw_model_object.hasOwnProperty(key)){
      model[key] = raw_model_object[key]; 
    } else {
      model[key] = schema[key].default;
    }
  }

  return model;
};

Model.remove_models = function () {
  defined_models = {};
};

Model.dump = function () {
  console.dir(defined_models);
};

function merge(schema, raw_obj) {
  for (key in schema) { 
    obj1[key] = obj2[key]; 
  }
}


module.exports = Model;
