angular.module("siger").controller("loginCtrl", function($scope, $state, $rootScope){
    $scope.submit = function(){
        var nome = $scope.nome;
        var senha = $scope.senha;
        if($scope.usuario == "admin" && $scope.senha == "admin"){
            $rootScope.logado = true;
            $state.go("dashboard");
        }else{
            alert("Usuário ou senha inválido.");
        }
    };
});