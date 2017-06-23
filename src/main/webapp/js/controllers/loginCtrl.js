angular.module("siger").controller("loginCtrl", function ($scope, $state, $rootScope, $firebaseAuth){
	

	$scope.logarComGoogle = function ()
	{
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope("https://www.googleapis.com/auth/plus.login");

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

			var email = error.email;

			var credential = error.credential;
		});
	};
	$scope.logarComEmail = function (email, senha)
	{
		firebase.auth().signInWithEmailAndPassword(email, senha).then(function ()
		{
			$rootScope.logado = true;
			$state.go("dashboard");
		}).catch(function (error)
		{
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
			// ...
		});
	};
});
