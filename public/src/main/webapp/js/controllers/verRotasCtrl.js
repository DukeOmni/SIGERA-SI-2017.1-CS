angular.module("siger").controller("verRotasCtrl", function (NgMap,$scope, $rootScope) {
    $scope.rotasCompletas = $rootScope.rotasFeitas;
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