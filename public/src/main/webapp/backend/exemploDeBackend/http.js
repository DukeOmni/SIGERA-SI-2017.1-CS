var router = require('./router.js');

var app = router(3412);
//Era esse tipo de backend que eu queria
var contatos= [
                    {nome: "Alex Cruzeiro Alves Gomes",  telefone : "9988-6325",operadora: {nome: "Oi"} ,data: new Date()},
                    {nome: "Pedro da Silva Figueireido", telefone: "1234-5678", operadora: {nome: "Vivo"} ,data: new Date()},
                    {nome: "João Prado", telefone: "99999-6666", operadora: {nome: "Tim"} ,data: new Date()},
                    {nome: "Lucas Henrique da Silva", telefone: "1111-1111", operadora: {nome: "Claro"} ,data: new Date()}
];  //Em vez de criar um array na memória, esses dados viriam do banco, era esse backend que eu imaginava

var operadoras = [
                    {nome: "Oi", codigo: 12, categoria: "Celular", preco: 2},
                    {nome: "Tim", codigo: 11, categoria: "Fixo", preco: 1},
                    {nome: "Claro", codigo: 11, categoria: "Celular", preco: 3},
                    {nome: "Vivo", codigo: 11, categoria: "Fixo", preco: 4}
];

app.get('/operadoras', function(req, res){ //Retorna o objeto operadoras quando recebe uma requisição do tipo get na porta 3412
    res.write(JSON.stringify(operadoras));
    res.end();
});

app.get('/contatos', function(req, res){
    res.write(JSON.stringify(contatos)); //Essa linha me fez entender como quer fazer, vou implementar.
    res.end();
});

app.post('/contatos', function(req, res){ //Adiciona ao array contatos o contato que o client manda na porta 3412
    var contato = req.body;
    contatos.push(JSON.parse(contato));
    res.end();
});

app.options('/contatos', function(req, res){
    res.end();
});
