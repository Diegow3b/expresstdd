var express = require('express');
var app = express();

var logger = require('./logger');

app.use(logger);
app.use(express.static('public'));

var index = require('./routes/index');
app.use('/', index)

module.exports = app;