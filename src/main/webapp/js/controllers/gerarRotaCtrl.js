angular.module("siger").controller("gerarRotaCtrl", function($scope,$state){ //Incluir o serviço alunosAPI
    $scope.alunos = [{nome: "Alex", endereco: "Aparecida de Goiânia, Rua 512", instituicao: "UFG", telefone: "Exemplo1"},
    {nome: "Joao", endereco: "Goiânia, Praça Cívica", instituicao: "Exemplo2", telefone: "Exemplo2"},
    {nome: "Maria", endereco: "Goiânia, Setor Bueno", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Caio", endereco: "Goiânia, Setor Universitário", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Vitor", endereco: "Aparecida de Goiânia, Cidade empresarial", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Ana", endereco: "Aparecida de Goiânia, Vila Brasília", instituicao: "Exemplo1", telefone: "Exemplo1"}
    ];
    
    // var carregarAlunos = function(){  //Assim que o backend ficar pronto
    //     alunosAPI.getAlunos().then(function(data){
    //         $scope.alunos = data.data;
    //     }, function(data){
    //         console.log("Não foi possível carregar os alunos :(");
    //     });
    // }; 

    $scope.gerarRota = function(alunos){
        $scope.alunosRota = alunos.filter(function(aluno){
            if(aluno.selecionado) return aluno;
        }); // Após essa linha mandaríamos o array alunosRota para o backend para carregar posteriormente na próxima tela.
        $state.go("dashboard.mapaRota"); //Move para a página do mapa
    };
});