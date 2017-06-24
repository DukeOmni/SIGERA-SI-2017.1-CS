var express = require('express');
var mongoose = require('mongoose');
var configDb = require('./config');
var setupAlunos = require('./controllers/setupControllerAlunos');
var setupRotas = require('./controllers/setupControllerRotas');
var app = express();
var port = process.env.port || 3000;


app.use('/',express.static(`${__dirname}/public/src/main/webapp/`));
mongoose.connect(configDb.dbConnectionString());
setupRotas(app);
setupAlunos(app);
app.listen(port);