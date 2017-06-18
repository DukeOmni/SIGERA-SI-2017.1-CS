angular.module("siger").config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state("dashboard", {
        templateUrl: "view/dashboard.html",
        url: "/dashboard",
        controller: "dashboardCtrl",
        resolve: {
            "check": function($state, $rootScope){
                if(!$rootScope.logado){
                    $state.go("login");
                }
            }
        }
    }).
    state("dashboard.cadastrarAluno", {
        url: "/cadastrarAluno",
        templateUrl: "view/cadastrar-aluno.html",
        controller: "cadastrarAlunoCtrl",
    }). 
    state("dashboard.gerarRota", {
        url: "/gerarRota",
        templateUrl: "view/gerar-rota.html",
        controller: "gerarRotaCtrl" ,
    }).
    state("dashboard.mapaRota", {
        url: "/mapaRota",
        templateUrl: "view/mapaRota.html",
        controller: "mapaRotaCtrl"
    }).
    state("dashboard.verAlunos", {
        url: "/verAlunos",
        templateUrl: "view/verAlunos.html",
        controller: "sigerCtrl"
    }).
    state("dashboard.sobreNos", {
        url: "/sobreNos",
        templateUrl: "view/sobreNos.html",
        controller: "sigerCtrl"
    }).
    state("dashboard.verRotas", {
        url: "/verRotas",
        templateUrl: "view/verRotas.html",
        controller: "verRotasCtrl"
    }).
    state("login", {
        url: "/login",
        templateUrl: "view/login.html",
        controller: "loginCtrl"
    });

    $urlRouterProvider.otherwise('/login');
});
