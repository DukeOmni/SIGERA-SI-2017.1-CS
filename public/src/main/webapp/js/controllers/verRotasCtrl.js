angular.module("siger").controller("verRotasCtrl", function ($scope, $rootScope, rotasAPI)
{
	// Variável user que recebe a referência do usuário atual que está logado
	var user = firebase.auth().currentUser; 

	// Variável que pausa o carregamento da div do mapa.
	$scope.pauseLoading = true;

	// Chamada ao método de rotasAPI que carrega as rotas do backend, passando como parâmetro o id do usuário que está logado.
	rotasAPI.getRotas(user.uid).then(function (response)
	{
		$scope.rotasCompletas = response.data;
		$scope.pauseLoading = false;
	});

	// Variável que determina o método de viagem da rota que será exibida no mapa
    $scope.travelMode = "DRIVING";

	// Função que mostra o mapa da rota selecionada pelo usuário
	$scope.mostrarRota = function (rota)
	{
		angular.element(document.querySelector("#" + rota + "Accordion"))[0].classList.toggle("active"); //Adiciona a classe CSS active para o elemento que contém a rota selecionada

		var rotaSelecionada = angular.element(document.querySelector("#" + rota))[0]; // Variável que recebe referência ao objeto HTML da DOM que se refere à rota selecionada.

		if (rotaSelecionada.style.maxHeight) // Se o elemento já tem altura máxima, ou seja, já está sendo exibido, tirar a altura para esconder o elemento.
		{

			rotaSelecionada.style.maxHeight = null;
		} else
		{

			rotaSelecionada.style.maxHeight = "400px";
		}
	};

});