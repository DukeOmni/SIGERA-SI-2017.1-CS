angular.module("siger").controller("cadastrarAlunoCtrl", function ($scope, $rootScope, alunosAPI, serialGenerate) 
{
	$scope.instituicoes = $rootScope.instituicoes;

	var user = firebase.auth().currentUser;

	$scope.adicionarAluno = function (aluno)
	{
		for (i = 0, len = $scope.instituicoes.length; i < len; i++)
		{
			if (aluno.instituicao == $scope.instituicoes[i].nome)
				aluno.instituicao = $scope.instituicoes[i];
		};

		aluno.serial = serialGenerate.generateSerial();

		aluno.user = user.uid;

		 alunosAPI.saveAluno(aluno).then(function ()
		 {
			 delete $scope.aluno;

             $scope.formAluno.$setPristine();
         });
     };

});