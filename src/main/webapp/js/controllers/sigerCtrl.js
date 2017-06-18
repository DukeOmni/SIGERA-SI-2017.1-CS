angular.module("siger").controller("sigerCtrl", function($scope, $location, $rootScope){
    $scope.alunos = $rootScope.alunosCadastrados;
    $scope.alunoSelecionado;
    $scope.mostrarAluno = function(aluno){
        $scope.alunoSelecionado = aluno;
    };
    $scope.fecharAluno = function(){
        $scope.alunoSelecionado = false;
    };
});


