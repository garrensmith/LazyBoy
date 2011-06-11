
var defined_models = {};

var Model = function (model_name, model_object) {
  defined_models[model_name] = model_object;
};

Model.load = function(model_name, raw_model_object) {
  var model = {};
  merge(model, raw_model_object);

  return model;
};

function merge(obj1, obj2) {
  for (attrname in obj2) { 
    obj1[attrname] = obj2[attrname]; 
  }
}


module.exports.Model = Model;
