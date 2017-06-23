angular.module("siger",["ui.router", "ngMap", "angular.google.distance", "ngAnimate", "firebase"]);
angular.module("siger").run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
	$rootScope.rotasFeitas = [];
	$rootScope.instituicoes = [{ nome: "UFG - Campus Samambaia", endereco: "Goiânia, UFG campus samambaia, Reitoria UFG" },
		{ nome: "UFG - Campus Universitário", endereco: "5ª Avenida - Setor Leste Universitário, Goiânia - GO" }];

    $rootScope.alunosCadastrados = [{nome: "Alex", endereco: "Aparecida de Goiânia, Rua 512", instituicao: $rootScope.instituicoes[0], telefone: "Exemplo1"},
		{ nome: "Joao", endereco: "Goiânia, Praça Cívica", instituicao: $rootScope.instituicoes[1], telefone: "Exemplo2"},
		{ nome: "Maria", endereco: "Goiânia, Setor Bueno", instituicao: $rootScope.instituicoes[0], telefone: "Exemplo1"},
		{ nome: "Caio", endereco: "Goiânia, Setor Universitário", instituicao: $rootScope.instituicoes[1], telefone: "Exemplo1"},
		{ nome: "Vitor", endereco: "Aparecida de Goiânia, Cidade empresarial", instituicao: $rootScope.instituicoes[0], telefone: "Exemplo1"},
		{ nome: "Ana", endereco: "Aparecida de Goiânia, Vila Brasília", instituicao: $rootScope.instituicoes[1], telefone: "Exemplo1"}
	];
	
});