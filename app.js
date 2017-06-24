var express = require('express');
var mongoose = require('mongoose');
var configDb = require('./config')
var app = express();
var port = process.env.port || 3000;


app.use('/',express.static(`${__dirname}/public/src/main/webapp/`))
mongoose.connect(configDb.dbConnectionString());
app.listen(port);