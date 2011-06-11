LazyBoy Object Modeller
=======================

# What have you done?

My experiments into what it takes to create a object mapper for Couchdb. This has been something I've been thinking about for a while and whether its a viable option. 

Currently its purely fun research. I've been reading through [mongoose](https://github.com/LearnBoost/mongoose) and [couch-ar](https://github.com/scottburch/couch-ar) as imspiration.

#How do I use this thing?

    new Model('User', {
      name: String
      surname: {type: String, default: "Rambo"}
    })

#What needs doing?

Plenty:

* Type casting
* Saving and loading of documents
* Create query language for finding
* Save, Create callbacks
* Validations

