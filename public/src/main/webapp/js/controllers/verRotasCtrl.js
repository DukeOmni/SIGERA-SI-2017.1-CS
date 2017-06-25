angular.module("siger").controller("verRotasCtrl", function (NgMap,$scope, $rootScope, rotasAPI) {
	var user = firebase.auth().currentUser;
	$scope.pauseLoading = true;

	rotasAPI.getRotas(user.uid).then(function (response)
	{
		$scope.rotasCompletas = response.data;
		$scope.pauseLoading = false;
	});

    $scope.travelMode = "DRIVING";
	var map = NgMap.getMap("mapaVerRotas").then(function (map) {
		console.log(map);
	});
    $scope.mostrarRota = function(rota){
		angular.element(document.querySelector("#" + rota + "Accordion"))[0].classList.toggle("active");
		var alunoSelecionado = angular.element(document.querySelector("#" + rota))[0];
		if (alunoSelecionado.style.maxHeight) {
			alunoSelecionado.style.maxHeight = null;
		} else {
			alunoSelecionado.style.maxHeight = "400px";
		}
	};


});