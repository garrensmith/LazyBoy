var Model = require('../lib/index.js'),
    logger = require('../lib/logger');

logger.setLogLevel(7);


Model.create_connection('lazyboy_tests');

var Author = Model.define('Author', {
                                      name: String,
                                      email: String
                            });

var Comment = Model.define('Comment',{
                                      user: String,
                                      msg: String
                                      }); 

var Post = Model.define('Post',{
                              title: String,
                              text: String,
                              date: Date,
                              comments: {has_many: Comment ,
                              author: {has_one: Author }
                              });

                        
          

