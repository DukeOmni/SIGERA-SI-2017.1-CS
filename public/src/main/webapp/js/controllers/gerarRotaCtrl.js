angular.module("siger").controller("gerarRotaCtrl", function($scope,$state, $rootScope, alunosAPI){ //Incluir o serviço alunosAPI
	$scope.destino;
	$scope.alunos;
     var carregarAlunos = function(){  //Assim que o backend ficar pronto
         alunosAPI.getAlunos().then(function(response){
			 $scope.alunos = response.data;
			 console.log(JSON.stringify(response));
         }, function(data){
             console.log("Não foi possível carregar os alunos :(");
         });
     }; 


    $scope.gerarRota = function(alunos){
        $scope.alunosRota = alunos.filter(function(aluno){
            if(aluno.selecionado) return aluno;
        }); // Após essa linha mandaríamos o array alunosRota para o backend para carregar posteriormente na próxima tela.
		$rootScope.rotaAtual = {alunosDaRota: $scope.alunosRota, destino: $scope.destino }; //Usando scope global por enquanto para testar interação entre os controllers
        $state.go("dashboard.mapaRota"); //Move para a página do mapa
    };
    $scope.isAlunoSelecionado = function(alunos){
        return alunos.some(function(aluno){
            return aluno.selecionado;
        });
	};

	carregarAlunos();
});