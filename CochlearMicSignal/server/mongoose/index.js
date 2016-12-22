var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017/cochlear-db';

// connect to db
mongoose.connect(dbURI);

// failed
mongoose.connection.on('error', console.error);
// successfuly connected
mongoose.connection.on('connected', function() {
  console.log('Connection to MongoDB established on: ' + dbURI);
});
// disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Connection to MongoDB was disconnected');
});


var modelsPath = __dirname + "/models";

require(modelsPath + '/Reading');
