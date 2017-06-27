angular.module("siger").controller("sigerCtrl", function ($scope, $location, $rootScope, alunosAPI)
{
	$scope.alunos;

	$scope.alunoSelecionado;

	var user = firebase.auth().currentUser;

	// Função que faz chamada ao backend para carregar os alunos do banco de dados.
	var carregarAlunos = function ()
	{ 
		alunosAPI.getAlunos(user.uid).then(function (response)
		{
			$scope.alunos = response.data;
			console.log(JSON.stringify($scope.alunos));
		}, function (data)
		{
			console.log("Não foi possível carregar os alunos :(");
		});
	}; 

	// Função que usa a mesma lógica do verRotas para mostrar determinado aluno selecionado pelo usuário
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

	//Função que deleta o aluno cadastrado pelo usuário no banco de dados.
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


