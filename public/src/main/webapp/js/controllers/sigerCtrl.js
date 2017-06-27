angular.module("siger").controller("sigerCtrl", function ($scope, $location, $rootScope, alunosAPI)
{
	$scope.alunos;

	$scope.alunoSelecionado;

	var user = firebase.auth().currentUser;

	// Fun��o que faz chamada ao backend para carregar os alunos do banco de dados.
	var carregarAlunos = function ()
	{ 
		alunosAPI.getAlunos(user.uid).then(function (response)
		{
			$scope.alunos = response.data;
			console.log(JSON.stringify($scope.alunos));
		}, function (data)
		{
			console.log("N�o foi poss�vel carregar os alunos :(");
		});
	}; 

	// Fun��o que usa a mesma l�gica do verRotas para mostrar determinado aluno selecionado pelo usu�rio
	$scope.mostrarAluno = function (aluno)
	{
		angular.element(document.querySelector("#" + aluno + "Accordion"))[0].classList.toggle("active");

		var alunoSelecionado = angular.element(document.querySelector("#" + aluno))[0];

		if (alunoSelecionado.style.maxHeight)
		{
            alunoSelecionado.style.maxHeight = null;
		} else
		{
            alunoSelecionado.style.maxHeight = "300px";
         }
	};

	//Fun��o que deleta o aluno cadastrado pelo usu�rio no banco de dados.
	$scope.deletarAluno = function (aluno)
	{
		alunosAPI.deleteAluno(aluno).then(function ()
		{
			carregarAlunos();
		});
	};

	//Recarrega os alunos do banco de dados.
	$scope.recarregarAlunos = function ()
	{
		carregarAlunos();
	};

	carregarAlunos(); //Carga inicial dos alunos do banco de dados para disponibilizar para a view.

});


