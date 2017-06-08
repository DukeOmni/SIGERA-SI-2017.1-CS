angular.module("siger").config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "view/main.html",
        controller: "mainCtrl"
    }).
    when("/cadastrarAluno", {
        templateUrl: "view/cadastrar-aluno.html",
        controller: "cadastrarAlunoCtrl"

    }). 
    when("/gerarRota", {
        templateUrl: "view/gerar-rota.html",
        controller: "gerarRotaCtrl" 
    }).
    when("/mapaRota", {
        templateUrl: "view/mapaRota.html",
        controller: "mapaRotaCtrl"
    });
});
