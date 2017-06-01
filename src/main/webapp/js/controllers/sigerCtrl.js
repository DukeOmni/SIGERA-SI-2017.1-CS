angular.module("siger").controller("sigerCtrl", function($scope, GeoCoder){
    $scope.alunos = [{nome: "Alex", endereco: "Exemplo1", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Joao", endereco: "Exemplo2", instituicao: "Exemplo2", telefone: "Exemplo2"},
    {nome: "Nome3", endereco: "Exemplo1", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Nome4", endereco: "Exemplo1", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Nome5", endereco: "Exemplo1", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Nome6", endereco: "Exemplo1", instituicao: "Exemplo1", telefone: "Exemplo1"}
    ];
    $scope.adicionarAluno = function(aluno){
        var address = document.getElementById("endereco").value;
        GeoCoder.geocode({address: "address"}).then(function(result){
            $scope.aluno.endereco = result[0].geometry.location;
        });
        $scope.alunos.push($scope.aluno);
        console.log(JSON.stringify($scope.alunos));
        delete $scope.aluno;
    };
    $scope.gerarRota = function(alunos){
        $scope.alunosRota = alunos.filter(function(aluno){
            if(aluno.selecionado) return aluno;
        });
        console.log("Os alunos que irão na rota são" + JSON.stringify($scope.alunosRota));
    };
});


