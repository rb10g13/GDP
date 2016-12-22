var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser = require('body-parser');

module.exports = function(app) {

  //import schemas
  var Reading = mongoose.model('Reading');


  //Helper functions
  var handleError = function(err) {
    console.error(err);

    return res.sendStatus(400); // Bad Request
  };


  // ** API Routes **
  var baseRoute = '/reading';

  // Register new article
  app.post('reading/first', bodyParser.json(), function(req, res) {
    var reading = req.body;

    Reading.create(reading, function() {
      if (err) handleError(err);

      res.sendStatus(200);
    });
  });

  //Get article by _id
  app.post('reading/new', bodyParser.json(), function(req, res) {
    var reading = req.body;

    Reading.create(reading, function() {
      if (err) handleError(err);

      res.send({}).status(200);
    });
  });
};
