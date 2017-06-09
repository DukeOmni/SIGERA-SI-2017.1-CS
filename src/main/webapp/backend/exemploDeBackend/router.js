var http = require('http');

var createRouter = function(port){
    
    var api = {};

    var routes = {};

    var methods = ['GET', 'POST', 'OPTIONS'];

    methods.forEach(function(method){
        routes[method] = {};
        api[method.toLowerCase()] = function(path, fn){
            routes[method][path] = fn;
        };
    });

    var handleBody = function(req, res, next){
        var body = [];
        req.on('data', function(chunk){
            body.push(chunk);
        });
        req.on('end', function(){
            req.body = Buffer.concat(body).toString();
            next();
        });
    };

    http.createServer(function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    handleBody(req, res, function(){
         if(!routes[req.method][req.url]) return res.end();
            routes[req.method][req.url](req, res);
    });
    }).listen(port);

    return api;
};
module.exports = createRouter;