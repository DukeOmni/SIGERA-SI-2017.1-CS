angular.module("siger").controller("sigerCtrl", function($scope, $location, $rootScope, alunosAPI){
	$scope.alunos;
	$scope.alunoSelecionado;

	var carregarAlunos = function ()
	{ 
		alunosAPI.getAlunos().then(function (response)
		{
			$scope.alunos = response.data;
			console.log(JSON.stringify($scope.alunos));
		}, function (data)
		{
			console.log("Não foi possível carregar os alunos :(");
		});
	}; 

	$scope.mostrarAluno = function (aluno)
	{
		console.log(aluno);
        angular.element(document.querySelector("#"+aluno+"Accordion"))[0].classList.toggle("active");
        var alunoSelecionado = angular.element(document.querySelector("#"+aluno))[0];
        if(alunoSelecionado.style.maxHeight){
            alunoSelecionado.style.maxHeight = null;
        }else{
            alunoSelecionado.style.maxHeight = "300px";
         }
	};

	$scope.deletarAluno = function (aluno)
	{
		alunosAPI.deleteAluno(aluno).then(function ()
		{
			carregarAlunos();
		});
	};
	$scope.recarregarAlunos = function ()
	{
		carregarAlunos();
	}
	carregarAlunos();
});


