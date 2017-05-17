angular.module("siger").config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "view/main.html"
    }).
    when("/cadastrarAluno", {
        templateUrl: "view/cadastrar-aluno.html"
    }). 
    when("/gerarRota", {
        templateUrl: "view/gerar-rota.html"    
    });
});