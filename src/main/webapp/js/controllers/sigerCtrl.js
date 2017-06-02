angular.module("siger").controller("sigerCtrl", function($scope, $location){
    $scope.alunos = [{nome: "Alex", endereco: "Aparecida de Goiânia, Rua 512", instituicao: "UFG", telefone: "Exemplo1"},
    {nome: "Joao", endereco: "Aparecida de Goiânia, Vila Brasília", instituicao: "Exemplo2", telefone: "Exemplo2"},
    {nome: "Maria", endereco: "Goiânia, Setor Bueno", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Caio", endereco: "Goiânia, Setor Marista", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Vitor", endereco: "Goiânia, Praça Universitária", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Ana", endereco: "Aparecida de Goiânia, Vila Brasília", instituicao: "Exemplo1", telefone: "Exemplo1"}
    ];
    $scope.adicionarAluno = function(aluno){
        $scope.alunos.push($scope.aluno);
        delete $scope.aluno;
    };

    $scope.gerarRota = function(alunos){
        $scope.alunosRota = alunos.filter(function(aluno){
            if(aluno.selecionado) return aluno;
        }); // Após essa linha mandaríamos o array alunosRota para o backend para carregar posteriormente na próxima tela.
        location.href = "#mapaRota";
    };

});


