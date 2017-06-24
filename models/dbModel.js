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
    // waypoint:[{
    //     location:{
    //         lat:Number,
    //         lng:Number,
    //         stopover:Boolean
    //     },
    destino:String,
    data: Date,
    serial: String
});
var Alunos = mongoose.model('AlunosCadastrados',alunosSchema,'users');
module.exports = {
Alunos: function(){
    return mongoose.model('AlunosCadastrados',alunosSchema,'users');
},
Rota: function() {
    return mongoose.model('RotaCompleta',rotaSchema,'users');
}
}