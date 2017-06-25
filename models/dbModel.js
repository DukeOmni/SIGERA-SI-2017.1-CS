var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var alunosSchema = new Schema({

    nome:String,
    endereco:String,
    instituicao: { 
        nome:String,
        endereco:String
    },
    telefone:String
});

var rotaSchema = new Schema({
    origem: Array,
    waypoint:Array,
    destino:String,
    data: Date,
    serial: String
});

module.exports = {
Alunos: function(){
    return mongoose.model('AlunosCadastrados',alunosSchema,'Alunos');
},
Rota: function() {
    return mongoose.model('RotaCompleta',rotaSchema,'Rotas');
}
}