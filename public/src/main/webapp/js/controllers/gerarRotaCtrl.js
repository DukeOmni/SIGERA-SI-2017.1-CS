angular.module("siger").controller("gerarRotaCtrl", function ($scope, $state, $rootScope, alunosAPI)
{
	var user = firebase.auth().currentUser;

	$scope.destino;

	$scope.alunos;

	var carregarAlunos = function (userId)
	{ 
		 alunosAPI.getAlunos(userId).then(function (response)
		 {
			 $scope.alunos = response.data;
			 console.log(JSON.stringify(response));
         }, function(data){
             console.log("Não foi possível carregar os alunos :(");
         });
     }; 


	$scope.gerarRota = function (alunos)
	{
		$scope.alunosRota = alunos.filter(function (aluno)
		{
            if(aluno.selecionado) return aluno;
		});
		
		$rootScope.rotaAtual = { alunosDaRota: $scope.alunosRota, destino: $scope.destino };

		$state.go("dashboard.mapaRota");

	};

	$scope.isAlunoSelecionado = function (alunos)
	{
		return alunos.some(function (aluno)
		{
            return aluno.selecionado;
		});

	};

	carregarAlunos(user.uid);
});