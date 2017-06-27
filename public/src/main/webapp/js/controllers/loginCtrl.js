angular.module("siger").controller("loginCtrl", function ($scope, $state, $rootScope){
	
	// Fun��o que possibilita o usu�rio logar com sua conta do Google
	$scope.logarComGoogle = function ()
	{
		var provider = new firebase.auth.GoogleAuthProvider();	// Instancia uma nova refer�ncia do provider de autentica��o da google do firebase.

		provider.addScope("https://www.googleapis.com/auth/plus.login"); //Adiciona uma url que servir� de escopo para essa refer�ncia.

		//Chamada a API do Firebase que passa o login para um popup de login da Google
		firebase.auth().signInWithPopup(provider).then(function (result)
		{
			var token = result.credential.accessToken;

			var user = result.user;

			$rootScope.logado = true;

			$state.go("dashboard");

		}).catch(function (error)
		{
			var errorCode = error.code;

			var errorMessage = error.message;

			console.log(errorMessage);
		});

	};

	// Chama a API do Firebase para efetuar a autentica��o usando o email e senha passados pelo usu�rio
	$scope.logarComEmail = function (email, senha)
	{
		firebase.auth().signInWithEmailAndPassword(email, senha).then(function ()
		{

			$rootScope.logado = true;

			$state.go("dashboard");

		}).catch(function (error)
		{
			
			var errorCode = error.code;

			var errorMessage = error.message;

			if (errorCode == 'auth/wrong-password')
			{
				alert("Senha incorreta");
			} else if (errorCode == 'auth/user-not-found') 
			{
				alert("Email n�o cadastrado");
			} else 
			{
				alert(errorMessage);
			};

			});

	};

});
