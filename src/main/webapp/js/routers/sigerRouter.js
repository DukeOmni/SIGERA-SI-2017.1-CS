angular.module("siger").config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state("home", {
        url: "/main",
        templateUrl: "view/main.html",
        controller: "mainCtrl"
    }).
    state("cadastrarAluno", {
        url: "/cadastrarAluno",
        templateUrl: "view/cadastrar-aluno.html",
        controller: "cadastrarAlunoCtrl",
    }). 
    state("gerarRota", {
        url: "/gerarRota",
        templateUrl: "view/gerar-rota.html",
        controller: "gerarRotaCtrl" ,
    }).
    state("mapaRota", {
        url: "/mapaRota",
        templateUrl: "view/mapaRota.html",
        controller: "mapaRotaCtrl"
    }).
    state("verAlunos", {
        url: "/verAlunos",
        templateUrl: "view/verAlunos.html",
        controller: "sigerCtrl"
    }).
    state("sobreNos", {
        url: "/sobreNos",
        templateUrl: "view/sobreNos.html",
        controller: "sigerCtrl"
    }).
    state("verRotas", {
        url: "/verRotas",
        templateUrl: "view/verRotas.html",
        controller: "verRotasCtrl"
    });

    $urlRouterProvider.otherwise('/home');
});
