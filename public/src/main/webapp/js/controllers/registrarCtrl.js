angular.module("siger").controller("registrarCtrl",function ($scope, $state, $rootScope)
{
	//Fun��o que registra o usu�rio recebendo email e senha passados pelo usu�rio na view, o registro do usu�rio � feito usando a API do Firebase
	$scope.register = function (email, senha)
	{

		//Chamada a fun��o de criar novo usu�rio com email e senha da API do Firebase
		firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function (error)
		{
			var errorCode = error.code;
			var errorMessage = error.message;
		});

		//Vari�vel global que determina se h� ou n�o um usu�rio logado no sistema
		$rootScope.logado = true;

		//Vai para o estado(p�gina) onde se encontra o menu inicial do sistema
		$state.go("dashboard");

	}
})