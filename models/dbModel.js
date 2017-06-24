var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var  alunosSchema = new Schema({

    nome:String,
    endereco:String,
    instituicao:String,
    telefone:String
});

var rotaSchema = new Schema({
    origem: /*Aqui eu preciso saber se pode ser type Number, o javascript não tem um tipo coordTostring*/
    waypoint:Array,
    destino:String,
    data: Date /*Pode escolher se a data é a atual{type: Date,default:Date.now}*/
});
module.exports = {
Alunos : function(){
    var AlunosCadastrados = mongoose.model('AlunosCadastrados',alunosSchema,'users');
    return AlunosCadastrados;
},
Rota: function() {
    var RotaCompleta = mongoose.model('RotaCompleta',rotaSchema,'users');
    return RotaCompleta;
}
}