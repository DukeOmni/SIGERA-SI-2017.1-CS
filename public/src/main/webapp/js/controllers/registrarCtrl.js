angular.module("siger").controller("registrarCtrl",function ($scope, $state, $rootScope)
{
	$scope.register = function (email, senha)
	{
		firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function (error)
		{
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
		});
		$rootScope.logado = true;
		$state.go("dashboard");
	}
})