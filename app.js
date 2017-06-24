var express = require('express');
var app = express();

var port = process.env.port || 3000;

app.use('/',express.static(`${__dirname}/public/src/main/webapp/`))
app.listen(port);