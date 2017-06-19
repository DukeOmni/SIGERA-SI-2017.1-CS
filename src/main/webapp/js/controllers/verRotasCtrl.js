angular.module("siger").controller("verRotasCtrl", function ($scope, $rootScope) {
    $scope.rotasCompletas = $rootScope.rotasFeitas;
    console.log($scope.rotasCompletas);
    $scope.travelMode = "DRIVING";

    $scope.mostrarRota = function(rota){
    if(rota.data != $scope.dataRotaAtual){
        $scope.origin = "" + rota.origem[0];
        $scope.waypoint = [];
        for(var i = 0, len = rota.waypoint.length; i < len; i++){
            $scope.waypoint[i] = { location: {lat:rota.waypoint[i].location.lat(), lng: rota.waypoint[i].location.lng()}, stopover: true};
        };
        $scope.destino = rota.destino;
        $scope.dataRotaAtual = rota.data;
        };
    };
});