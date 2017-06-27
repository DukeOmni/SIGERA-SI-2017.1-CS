angular.module("siger").controller("verRotasCtrl", function ($scope, $rootScope, rotasAPI)
{
	// Vari�vel user que recebe a refer�ncia do usu�rio atual que est� logado
	var user = firebase.auth().currentUser; 

	// Vari�vel que pausa o carregamento da div do mapa.
	$scope.pauseLoading = true;

	// Chamada ao m�todo de rotasAPI que carrega as rotas do backend, passando como par�metro o id do usu�rio que est� logado.
	rotasAPI.getRotas(user.uid).then(function (response)
	{
		$scope.rotasCompletas = response.data;
		$scope.pauseLoading = false;
	});

	// Vari�vel que determina o m�todo de viagem da rota que ser� exibida no mapa
    $scope.travelMode = "DRIVING";

	// Fun��o que mostra o mapa da rota selecionada pelo usu�rio
	$scope.mostrarRota = function (rota)
	{
		angular.element(document.querySelector("#" + rota + "Accordion"))[0].classList.toggle("active"); //Adiciona a classe CSS active para o elemento que cont�m a rota selecionada

		var rotaSelecionada = angular.element(document.querySelector("#" + rota))[0]; // Vari�vel que recebe refer�ncia ao objeto HTML da DOM que se refere � rota selecionada.

		if (rotaSelecionada.style.maxHeight) // Se o elemento j� tem altura m�xima, ou seja, j� est� sendo exibido, tirar a altura para esconder o elemento.
		{

			rotaSelecionada.style.maxHeight = null;
		} else
		{

			rotaSelecionada.style.maxHeight = "400px";
		}
	};

});