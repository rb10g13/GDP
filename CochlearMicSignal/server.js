// ** Dependancies **

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// ** Configurations **

var serverPath = './server';

//Mongoose
require(serverPath + '/mongoose');


// ** Middleware **

// template engine
app.set('view engine', 'ejs');
// body parser
// jsonParser = bodyParser.json(); // global variable (no 'var')


// ** Routes **
require(serverPath + '/routes')(app);


app.listen(3100);
