angular.module("siger").controller("cadastrarAlunoCtrl", function($scope){ //Incluir alunosAPI
    $scope.alunos = [];
    $scope.adicionarAluno = function(aluno){
        $scope.alunos.push($scope.aluno); //Em vez de adicionar ao array, enviaria para o backend
        delete $scope.aluno;
        $scope.formAluno.$setPristine();
    };

    // $scope.adicionarAluno = function(aluno){  //Assim que o backend ficar pronto
    //     alunosAPI.saveAluno(aluno).then(function(){
    //         delete $scope.aluno;
    //         $scope.formAluno.$setPristine();
    //     });
    // };

});