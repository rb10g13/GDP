var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');
var PythonShell = require('python-shell');

module.exports = function(app) {

  //import schemas
  var Reading = mongoose.model('Reading');


  //Helper functions
  var handleError = function(err) {
    console.error(err);

    return res.sendStatus(400); // Bad Request
  };

  var produceFRC = function() {
    PythonShell.run('../../../CI_Tests/FRC.py', function(err) {
      if (err) throw err;
      console.log('finished');
    });
  };
  produceFRC();


  // Post control (initial) reading
  app.get('/reading/exists/:number/:ear', function(req, res) {
    var number = req.params.number;
    var ear = req.params.ear;

    var implant_id = {
      number: number,
      ear: ear
    };

    Reading.count({ impland_id: implant_id }, function(err, count) {
      if (err) handleError(err);
      console.log(count);
      res.json({ count: count }).status(200);
    });
  });

  // Post control (initial) reading
  app.post('/reading/control', bodyParser.json(), function(req, res) {
    var recording = req.body.recording;
    var implant_id = req.body.implant_id;

    var reading = {
      control: true,
      implant_id: implant_id,
      frc: FRC,
      date: new Date(),
    };

    Reading.create(reading, function(err) {
      if (err) handleError(err);

      res.sendStatus(200);
    });
  });

  // Register new reading in database and send result back
  app.post('/reading/new', bodyParser.json(), function(req, res) {
    var recording = req.body.recording;
    var implant_id = req.body.implant_id;

    var reading = {
      control: false,
      implant_id: implant_id,
      frc: FRC,
      date: new Date(),
    };

    Reading.create(reading, function(err) {
      if (err) handleError(err);

      res.send({}).status(200);
    });
  });
};
