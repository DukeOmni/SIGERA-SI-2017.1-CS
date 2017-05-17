angular.module("siger").controller("sigerCtrl", function($scope){
    $scope.alunos = [];
    $scope.adicionarAluno = function(aluno){
        $scope.alunos.push($scope.aluno);
        delete $scope.aluno;
    };
});
