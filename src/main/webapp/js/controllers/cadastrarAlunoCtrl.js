angular.module("siger").controller("cadastrarAlunoCtrl", function($scope){
    $scope.alunos = [];
    $scope.adicionarAluno = function(aluno){
        $scope.alunos.push($scope.aluno); //Em vez de adicionar ao array, enviaria para o backend
        delete $scope.aluno;
        $scope.formAluno.$setPristine();
    };
});