var express = require('express');
var app = express();

// var logger = require('./logger');
// app.use(logger);

app.use(express.static(__dirname + '/public'));

var index = require('./routes/index');
app.use('/', index);

var cities = require('./routes/cities');
app.use('/cities', cities);

module.exports = app;