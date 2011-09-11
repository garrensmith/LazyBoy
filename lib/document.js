var Saveable = require('./base').Saveable,
    Removeable  = require('./base').Removeable;

var Document = function (beforeSaveFn, afterSaveFn, beforeRemoveFn, afterRemoveFn, schema, model_type) {
  var self =  this;

   self.beforeSaveFn = beforeSaveFn;
   self.afterSaveFn = afterSaveFn;
   self.beforeRemoveFn = beforeRemoveFn;
   self.afterRemoveFn = afterRemoveFn;
   self.schema = schema;
   self.model_type = model_type;

  this.serialise = function () {
    var self = this;
    var serialised_doc = {};

    serialised_doc.dateCreated = self.dateCreated;
    serialised_doc.lastUpdated = self.lastUpdated;
    serialised_doc.model_type = self.model_type;

    Object.keys(self.schema).forEach(function (key) {

      if (self.schema[key].type.has_one) {
        return serialised_doc[key] = self[key].serialise();
      }

      if (self.schema[key].type.has_many) {
        var many_docs = [];
        self[key].forEach( function (item) {
          many_docs.push(item.serialise());
        });

        return serialised_doc[key] = many_docs;
      }

      serialised_doc[key] = self[key] 

    });

    return serialised_doc;
  };

  

};

Saveable.call(Document.prototype);
Removeable.call(Document.prototype);

module.exports = Document;

