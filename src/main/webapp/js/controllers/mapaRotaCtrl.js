angular.module("siger").controller("mapaRotaCtrl", function($scope, GeoCoder){
    
    $scope.alunos = [{nome: "Alex", endereco: "Aparecida de Goiânia, Rua 512", instituicao: "UFG", telefone: "Exemplo1"},
    {nome: "Joao", endereco: "Aparecida de Goiânia", instituicao: "Exemplo2", telefone: "Exemplo2"},
    {nome: "Maria", endereco: "Rio Verde", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Caio", endereco: "São Paulo", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Vitor", endereco: "Minas Gerais", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Ana", endereco: "Tocantins", instituicao: "Exemplo1", telefone: "Exemplo1"}
    ];

    $scope.destino = "Brasília";
    $scope.waypoint = [];

    $scope.initMap = function (map){
        calcRota();
        $scope.$apply();
    };

     function calcRota (){ //Carregaria do backend o array de alunosRota para poder calcular a rota;
        var alunos = $scope.alunos;
        for (var i = 0, len = alunos.length; i < len; i++){
           $scope.waypoint[i] = alunos[i].endereco;
        };

        console.log($scope.waypoint);

        // for (var i = 0, len = $scope.waypoint.length; i < len; i++){
        //     var address = $scope.waypoint[i];
        //     GeoCoder.geocode({address: "address"}).then(async function (result) {
        //         console.log()
        //         let aux = await result[0].geometry.location;
        //         coordRota[i] = aux;
        //         console.log(JSON.stringify(coordRota[i]));
        //     });
        // };
    }; 
});