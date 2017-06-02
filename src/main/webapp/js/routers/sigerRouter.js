angular.module("siger").config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "view/main.html",
        controller: "sigerCtrl"
    }).
    when("/cadastrarAluno", {
        templateUrl: "view/cadastrar-aluno.html",
        controller: "sigerCtrl"

    }). 
    when("/gerarRota", {
        templateUrl: "view/gerar-rota.html",
        controller: "sigerCtrl" 
    }).
    when("/mapaRota", {
        templateUrl: "view/mapaRota.html",
        controller: "mapaRotaCtrl"
    });
});
