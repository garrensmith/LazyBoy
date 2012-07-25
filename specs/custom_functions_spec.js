var assert = require('assert'),
    db = require('./spec_helper').db,
    Model = require('../lib/index');


describe("Model can have custom functions", function () {

  before(function (done) {
    var Vehicle = Model.define('Vehicle', {
      name: String,
      gear: {type: Number, default: 1}
    });

    Model.define('Airplane', {name: String});

    Vehicle.addMethod('sound', function () {
      return "Rooooooooom";
    });

    Vehicle.addMethod('change_gear', function (gear) {
      var old_gear = this.gear;
      this.gear = gear;

      return "changing from " + old_gear + " to " + gear;
    });

    Model.load(function () {
      done();
    });
  });

  it("Should have custom defined method", function () {
    var Vehicle = Model('Vehicle');
    
    var ford = Vehicle.create({name: "Ford Fiesta"});

    ford.should.have.property('sound');
    //assert.equal(ford.sound,null)
  });

  it("Should be able to be called", function () {
    var Vehicle = Model('Vehicle');

    var bmw =  Vehicle.create({name: "BMW"});

    bmw.sound().should.equal("Rooooooooom");

  });

  it("Should be able to pass parameters to it", function () {
    var Vehicle = Model('Vehicle');
    
    var ford = Vehicle.create({name: "Ford Fiesta"});
    ford.change_gear(3).should.equal("changing from 1 to 3");

  });

  it("Should not be accessible on other models", function () {
    var Airplane = Model('Airplane');
    var cessna = Airplane.create({name: "Cessna"});

    cessna.should.not.have.property('sound');

  });


});

