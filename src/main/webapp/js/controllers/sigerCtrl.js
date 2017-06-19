angular.module("siger").controller("sigerCtrl", function($scope, $location, $rootScope){
    $scope.alunos = $rootScope.alunosCadastrados;
    $scope.alunoSelecionado;
    var fecharAluno = function(){
        console.log("Entrou aqui");
        $scope.alunoSelecionado = false;
    };
    $scope.mostrarAluno = function(aluno){
       if($scope.alunoSelecionado == aluno){
            fecharAluno();
        }else{
        $scope.alunoSelecionado = aluno;
        }
    };
});


