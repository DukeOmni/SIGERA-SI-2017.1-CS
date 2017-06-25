var Sigera = require('../models/dbModel');
var bodyparser = require('body-parser');

module.exports = function(express_app){
// Mideware sem endpoint aponta para todas requisições, nesse caso
// para formatar todas as respostas de requisições para JSON
// Essa api suporta url codificada com % e hexadecimais
    express_app.use(bodyparser.json());
    express_app.use(bodyparser.urlencoded({extended:true}));
    express_app.use(function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

// EndPoint para GET
    express_app.get('/api/alunos/',function(req,res){
        Sigera.Alunos().find({},function(err,querry){
            if(err)throw err;
            res.send(querry);
        });
    });
// Endpoint para POST utilizando do body da requisição
    express_app.post('/api/alunos',function(req,res){
//Se houver um _id no body da requisição http, ele atualiza
//Só atualiza se o body houver todas as propriedades
        if(req.body._id){
            Sigera.Alunos().findByIdAndUpdate(req.body._id,{nome:req.body.nome,endereco:req.body.endereco,
            instituicao:{nome:req.body.instituicao.nome,endereco:req.body.instituicao.endereco},
            telefone:req.body.telefone,serial:req.body.serial},
            
            function(err,results){
                if(err)throw err;
                res.send('Success');
        })
    }
// Caso não envie o _id, ele não existe e nesse caso deve ser
// Adicionado um outro
// Tirando o _id, deve enviar todas as outras propriedades abaixo
        else{
            var novoAluno = Sigera.Alunos();
            var objectAluno = novoAluno({
                nome:req.body.nome,
                endereco:req.body.endereco,
                instituicao:{
                    nome:req.body.instituicao.nome,
                    endereco:req.body.instituicao.endereco
                },
                telefone:req.body.telefone,
                serial:req.body.serial
            })
// Workarround
            objectAluno.save(function(err,results){
                if(err)throw err;
                res.send('Success');
            })
        }
// termino da função
    });
// EndPoint para DELETE 
    express_app.delete('/api/alunos/:id',function(req,res){
        Sigera.Alunos().findByIdAndRemove({_id:req.params.id},function(err){
            if (err)throw err;
            res.send('Success');
        });
        });
}/*Término do module.exports*/