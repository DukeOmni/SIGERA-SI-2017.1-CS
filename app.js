var express = require('express');
var mongoose = require('mongoose');
var configDb = require('./config');
var setupAlunos = require('./controllers/setupControllerAlunos');
var setupRotas = require('./controllers/setupControllerRotas');
var apiControllerAlunos= require('./controllers/apiControllerAlunos');
var apiControllerRotas = require('./controllers/apiControllerRotas');
var app = express();
var port = process.env.port || 3000;


app.use('/',express.static(`${__dirname}/public/src/main/webapp/`));
mongoose.connect(configDb.dbConnectionString());
setupRotas(app);
setupAlunos(app);
apiControllerAlunos(app);
apiControllerRotas(app);
app.listen(port);