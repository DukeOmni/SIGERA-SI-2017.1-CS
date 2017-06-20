angular.module("siger").controller("gerarRotaCtrl", function($scope,$state, $rootScope){ //Incluir o serviço alunosAPI
    $scope.alunos = $rootScope.alunosCadastrados;
    
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
        $rootScope.alunosDaRota = $scope.alunosRota; //Usando scope global por enquanto para testar interação entre os controllers
        $state.go("dashboard.mapaRota"); //Move para a página do mapa
    };
    $scope.isAlunoSelecionado = function(alunos){
        return alunos.some(function(aluno){
            return aluno.selecionado;
        });
    };
});