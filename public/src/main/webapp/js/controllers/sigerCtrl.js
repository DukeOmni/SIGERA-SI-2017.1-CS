angular.module("siger").controller("sigerCtrl", function($scope, $location, $rootScope, alunosAPI){
	$scope.alunos;
	$scope.alunoSelecionado;

	var carregarAlunos = function ()
	{ 
		alunosAPI.getAlunos().then(function (response)
		{
			$scope.alunos = response.data;
		}, function (data)
		{
			console.log("Não foi possível carregar os alunos :(");
		});
	}; 

    $scope.mostrarAluno = function(aluno){
        angular.element(document.querySelector("#"+aluno+"Accordion"))[0].classList.toggle("active");
        var alunoSelecionado = angular.element(document.querySelector("#"+aluno))[0];
        if(alunoSelecionado.style.maxHeight){
            alunoSelecionado.style.maxHeight = null;
        }else{
            alunoSelecionado.style.maxHeight = "200px";
         }
	};

	carregarAlunos();
});


