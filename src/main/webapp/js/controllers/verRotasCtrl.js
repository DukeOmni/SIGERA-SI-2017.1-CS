angular.module("siger").controller("verRotasCtrl", function ($scope) {
    $scope.rotasCompletas = [{ origem: [-16.7630886,-49.263628499999996], waypoint: [{ location: { lat: -16.7601388, lng: -49.269875100000036 }, stopover: true }, { location: { lat: -16.7399897, lng: -49.26133390000001 }, stopover: true }, { location: { lat: -16.7497725, lng: -49.30505920000002 }, stopover: true }, { location: { lat: -16.7004399, lng: -49.276539000000014 }, stopover: true }, { location: { lat: -16.6767339, lng: -49.246098399999994 }, stopover: true }, { location: { lat: -16.6806193, lng: -49.25633749999997 }, stopover: true }], destino: "Goiânia, UFG campus samambaia, Reitoria UFG", data: "2017-06-18T04:25:40.215Z" }];
    $scope.travelMode = "DRIVING";
    
    $scope.mostrarRota = function(rota){
    $scope.origin = "" + rota.origem[0] + "," + rota.origem[1];
    $scope.waypoint = rota.waypoint;
    $scope.destino = rota.destino;
    };
});