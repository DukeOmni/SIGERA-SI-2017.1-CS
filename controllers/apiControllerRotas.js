var Sigera = require('../models/dbModel');
var bodyparser = require('body-parser');

module.exports = function(express_app){
    express_app.use(bodyparser.json());
    express_app.use(bodyparser.urlencoded({extended:true}));
    express_app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
// END POINT para GET em api ROTAS, return = ALL
    express_app.get('/api/rotas',function(req,res){
        Sigera.Rota().find({},function(err,querry){
            if(err)throw err;
            res.send(querry);
        });
    });
    express_app.get('/api/rotas/:username',function(req,res){
        Sigera.Rota().find({user:req.params.username},function(err,querry){
            if(err)throw err;
            res.send(querry);
        });
    });
// END POINT para POST em api ROTAS, return 'succes'
    express_app.post('/api/rotas',function(req,res){
// Caso mande um ID, UPDATE!!! Ele dá o update no objeto como você mandou,
// Caso não mande algum atributo ele não incluirá no banco esse atributo
// Tome cuidado
        if(req.body._id){
            Sigera.Rota().findByIdAndUpdate(req.body._id,{origem:req.body.origem,waypoint:req.body.waypoint,
            destino:req.body.destino,data:req.body.data,serial:req.body.serial,user:req.body.user},function(err,querry){
                if(err) throw err;
                res.send('Success');

            });
        }
// Caso não mande um ID, CREATE!!
        else{
            var novoRota = Sigera.Rota();
            var objectRota = novoRota({
                user: req.body.user,
                origem: req.body.origem,
                waypoint:req.body.waypoint,
                destino:req.body.destino,
                data: req.body.data,
                serial: req.body.serial
});
        objectRota.save(function(err){
            if(err)throw err;
            res.send('Success');
        });
        }
    });/*fim do post*/
// END Point da API para Delete, recebe o ID do objeto pela URL
    express_app.delete('/api/rotas/:id',function(req,res){
        Sigera.Rota().findByIdAndRemove({_id:req.params.id},function(err){
            if(err)throw err;
            res.send('Success');
        });
    });
}/*Fim da exports*/