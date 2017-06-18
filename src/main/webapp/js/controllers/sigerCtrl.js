angular.module("siger").controller("sigerCtrl", function($scope, $location){
    $scope.alunos = [{nome: "Alex", endereco: "Aparecida de Goiânia, Rua 512", instituicao: "UFG", telefone: "Exemplo1"},
    {nome: "Joao", endereco: "Goiânia, Praça Cívica", instituicao: "Exemplo2", telefone: "Exemplo2"},
    {nome: "Maria", endereco: "Goiânia, Setor Bueno", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Caio", endereco: "Goiânia, Setor Universitário", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Vitor", endereco: "Aparecida de Goiânia, Cidade empresarial", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Ana", endereco: "Aparecida de Goiânia, Vila Brasília", instituicao: "Exemplo1", telefone: "Exemplo1"}
    ];
    $scope.alunoSelecionado;
    $scope.mostrarAluno = function(aluno){
        $scope.alunoSelecionado = aluno;
    };
    $scope.fecharAluno = function(){
        $scope.alunoSelecionado = false;
    };
});


