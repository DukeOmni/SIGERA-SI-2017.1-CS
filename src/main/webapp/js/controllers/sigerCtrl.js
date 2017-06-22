angular.module("siger").controller("sigerCtrl", function($scope, $location, $rootScope){
    $scope.alunos = $rootScope.alunosCadastrados;
    $scope.alunoSelecionado;
    $scope.mostrarAluno = function(aluno){
        angular.element(document.querySelector("#"+aluno+"Accordion"))[0].classList.toggle("active");
        var alunoSelecionado = angular.element(document.querySelector("#"+aluno))[0];
        if(alunoSelecionado.style.maxHeight){
            alunoSelecionado.style.maxHeight = null;
        }else{
            alunoSelecionado.style.maxHeight = "200px";
         }
    };
});


