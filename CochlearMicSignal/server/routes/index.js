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

  var produceFRC = function(recording) {
    var options = {
      scriptPath: '../CI_Tests',
      args: [recording]
    };

    PythonShell.run('FRC.py', options, function(err, FRC) {
      if (err) throw err;

      return FRC;
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

    var FRC = produceFRC(recording);

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

    var FRC = produceFRC(recording);

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
