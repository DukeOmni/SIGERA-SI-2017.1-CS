var Sigera = require('../models/dbModel');
var bodyparser = require('body-parser');

module.exports = function(express_app){
// Mideware sem endpoint aponta para todas requisições, nesse caso
// para formatar todas as respostas de requisições para JSON
    express_app.use(bodyparser.json());
    express_app.use(bodyparser.urlencoded({extended:true}));
/*----------------------ALUNO---------------------------*/
// EndPoint para Get utilizando url, com o parametro NOME
    express_app.get('/api/alunos/:nomeAluno',function(req,res){
        Sigera.Alunos().find({nome:req.params.nomeAluno},function(err,querry){
            if(err)throw err;
            res.send('Success');
        });
    });
// Endpoint para post utilizando do body da requisição
    express_app.post('/api/alunos',function(req,res){
//Se mandar o ID, quer dizer UPDATE: 
        if(req.body.id){
            Sigera.Alunos().findByIdAndUpdate(req.body.id,{endereco:req.body.endereco,
                instituicao:{nome:req.body.instituicao.nome,endereco:req.body.instituicao.endereco},
                telefone:req.body.telefone}),function(err,querry){
                    if(err)throw err;
                    res.send('Succes');
                }
        }
// Se não mandar o ID, quer dizer CREATE::
        else{
            var novoAluno = Sigera.Alunos({
            endereco:req.body.endereco,
            instituicao: { 
                nome:req.body.instituicao.nome,
                endereco:req.body.instituicao.endereco
                },
            telefone:req.body.telefone
            });
        }
    });
}