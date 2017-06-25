var seed = require('../models/dbModel.js')

module.exports = function(express_app){
    express_app.get('/api/setup/alunos',function(req,res){
        var seedAluno = [
        {
        nome: "Alex",
        endereco: "Aparecida de Goiânia, Rua 512",
        instituicao: {
            nome:"UFG - Campus Samambaia",
            endereco: "Goiânia, UFG campus samambaia, Reitoria UFG"
        },
        telefone: "Exemplo1",
        serial: "qualquer string"
    },
		{
        nome: "Joao", endereco: "Goiânia, Praça Cívica",
        instituicao:{
            nome:"UFG - Campus Universitário",
            endereco: "5ª Avenida - Setor Leste Universitário, Goiânia - GO"
        },
        telefone: "Exemplo2"},
		{
        nome: "Maria",
        endereco: "Goiânia, Setor Bueno", 
        instituicao: {
            nome:"UFG - Campus Samambaia",
            endereco: "Goiânia, UFG campus samambaia, Reitoria UFG"
        },
        telefone: "Exemplo1"},
		{ 
        nome: "Caio", 
        endereco: "Goiânia, Setor Universitário",
        instituicao:{
            nome:"UFG - Campus Universitário",
            endereco: "5ª Avenida - Setor Leste Universitário, Goiânia - GO"
        },
        telefone: "Exemplo1"},
		{ nome: "Vitor",
        endereco: "Aparecida de Goiânia, Cidade empresarial",
        instituicao:{
            nome: "UFG - Campus Samambaia",
            endereco: "Goiânia, UFG campus samambaia, Reitoria UFG"
        },
        telefone: "Exemplo1"},
		{
        nome: "Ana",
        endereco: "Aparecida de Goiânia, Vila Brasília",
        instituicao:{
            nome: "UFG - Campus Universitário",
            endereco: "5ª Avenida - Setor Leste Universitário, Goiânia - GO"
        },
        telefone: "Exemplo1"}
	];
        seed.Alunos().create(seedAluno,function(err,results){
            if(err)throw err;
            res.send(results);
        })
    });
}