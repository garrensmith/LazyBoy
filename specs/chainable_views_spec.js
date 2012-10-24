var db = require('./spec_helper').db,
    Model = require('../lib/index');

describe("Custom views", function () {

  before(function (done) {
    var RankingThing = Model.define("RankingThing",{rank: Number, name: String});

    RankingThing.addView('ByRankAndName',{ 
      map: function (doc) {
        if (doc.model_type === 'RankingThing') {
          emit([doc.rank, doc.name],1);
        }
      }
    });

    RankingThing.addView('ByName',{ 
      map: function (doc) {
        if (doc.model_type === 'RankingThing') {
          emit(doc.name,1);
        }
      }
    });



    Model.load(function () {

      RankingThing.create({name: "Thing1", rank: 5}).save();
      RankingThing.create({name: "Thing2", rank: 1}).save(); 
      RankingThing.create({name: "Thing3", rank: 3}).save();
      RankingThing.create({name: "Thing4", rank: 5}).save();
      RankingThing.create({name: "Thing5", rank: 2}).save(); 
      RankingThing.create({name: "Thing6", rank: 3}).save();
      RankingThing.create({name: "Thing7", rank: 5}).save(function () {
        done();

      });
    });

  });

  it("Should have chainable start and end key", function (done) {
    var RankingThing = Model('RankingThing');
    RankingThing.view('ByRankAndName').startkey([2, "Thing"]).endkey([3, {}], function (err, things) {
      things.length.should.equal(3);
      done();
    });
  });

  it("Should descend", function (done) {
    var RankingThing = Model('RankingThing');
    RankingThing.view('ByName').descending(function (err, things) {
      things[0].name.should === "Thing1"
      things[3].name.should === "Thing4"
      things[6].name.should === "Thing7"
      done();
    });
  });

  it("Should limit", function (done) {
    var RankingThing = Model('RankingThing');
    RankingThing.view('ByName').limit(2, function (err, things) {
      things.length.should.equal(2);
      done();
    });
  });

  it("Should skip", function (done) {
    var RankingThing = Model('RankingThing');
    RankingThing.view('ByName').skip(2, function (err, things) {
      things.length.should.equal(5);
      things[0].name.should === "Thing3"
      done();
    });
  });
});


