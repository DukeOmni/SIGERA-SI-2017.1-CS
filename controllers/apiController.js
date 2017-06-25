var Sigera = require('../models/dbModel');
var bodyparser = require('body-parser');

module.exports = function(express_app){
// Mideware sem endpoint aponta para todas requisições, nesse caso
// para formatar todas as respostas de requisições para JSON
    express_app.use(bodyparser.json());
    express_app.use(bodyparser.urlencoded({extended:true}));
/*----------------------ALUNO---------------------------*/
// EndPoint para GET utilizando url, com o parametro NOME
    express_app.get('/api/alunos/:nomeAluno',function(req,res){
        Sigera.Alunos().find({nome:req.params.nomeAluno},function(err,querry){
            if(err)throw err;
            res.send(querry);
        });
    });
// Endpoint para POST utilizando do body da requisição
    express_app.post('/api/alunos',function(req,res){    
        if(req.body._id){
            Sigera.Alunos().findByIdAndUpdate(req.body._id,{nome:req.body.nome,endereco:req.body.endereco,
            instituicao:{nome:req.body.instituicao.nome,endereco:req.body.instituicao.endereco},
            telefone:req.body.telefone},
            
            function(err,results){
                if(err)throw err;
                res.send('Success');
        })
    }
        else{
            var novoAluno = Sigera.Alunos();
            var testeAluno = novoAluno({
                nome:req.body.nome,
                endereco:req.body.endereco,
                instituicao:{
                    nome:req.body.instituicao.nome,
                    endereco:req.body.instituicao.endereco
                },
                telefone:req.body.telefone
            })
            testeAluno.save(function(err,results){
                if(err)throw err;
                res.send('Success');
            })
        }
// termino da função
    });
}/*Término do module.exports*/