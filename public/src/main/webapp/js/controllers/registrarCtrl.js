angular.module("siger").controller("registrarCtrl",function ($scope, $state, $rootScope)
{
	//Função que registra o usuário recebendo email e senha passados pelo usuário na view, o registro do usuário é feito usando a API do Firebase
	$scope.register = function (email, senha)
	{

		//Chamada a função de criar novo usuário com email e senha da API do Firebase
		firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function (error)
		{
			var errorCode = error.code;
			var errorMessage = error.message;
		});

		//Variável global que determina se há ou não um usuário logado no sistema
		$rootScope.logado = true;

		//Vai para o estado(página) onde se encontra o menu inicial do sistema
		$state.go("dashboard");

	}
})