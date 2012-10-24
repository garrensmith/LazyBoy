---
layout: default
title: Embedding
---

Embedding Models
================

LazyBoy supports basic document relations by embedding other models in the main object.

## One to one

To define a model which has another model embedded in it, define as follows

      Owner = Model.define("Owner", {
        name: String
      });
      
      AddressBook = Model.define("AddressBook", {
        name: String,
        owner: {has_one: Owner}
      });

This will store the `Owner` modeil inside the address book. However the Owner model will not have a unique id and can only be queried by finding the specific address book that it belongs to.

## One to many

LazyBoy can also embed multiple documents in one model, these documents are stored as an array.

      Comment = Model.define("Comment", {
        name: String,
        text: String
      });
      
      BlogPost = Model.define("BlogPost", {
        title: String,
        comments: {has_many: Comment}
      });





