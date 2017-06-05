angular.module("siger").controller("mapaRotaCtrl", function($scope, GeoCoder, $timeout){
    
    $scope.alunos = [{nome: "Alex", endereco: "Aparecida de Goiânia, Rua 512", instituicao: "UFG", telefone: "Exemplo1"},
    {nome: "Joao", endereco: "Via do Conhecimento, km1, Pato Branco, Paraná", instituicao: "Exemplo2", telefone: "Exemplo2"},
    {nome: "Maria", endereco: "Rio Verde", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Caio", endereco: "São Paulo", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Vitor", endereco: "Minas Gerais", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Ana", endereco: "Tocantins", instituicao: "Exemplo1", telefone: "Exemplo1"}
    ]; //Carregaria do backend o array de alunosRota para poder calcular a rota;

    $scope.destino = "Brasília";
    $scope.waypoint = [];
    $scope.googleMapUrl = "https://maps.google.com/maps/api/js";
    $scope.pauseLoading = true;

    $timeout(function () { //Carregamento adiado em função da necessidade de calcular as coordenadas dos waypoints antes, pois na inicialização do mapa esses valores já devem existir para não resultar em erro
        console.log("Mapa carregado");
        $scope.pauseLoading = false;
    }, 4500);

    calcRota();

    $scope.waypoint = traduzRota($scope.waypoint, 0);

     function calcRota (){ 
        var alunos = $scope.alunos;
        for (var i = 0, len = alunos.length; i < len; i++){
           $scope.waypoint[i] = alunos[i].endereco;
        };
    };

        function traduzRota(address, index){
            var addressAux = address[index];
            GeoCoder.geocode({address: addressAux}).then(function (result) { 
                console.log(addressAux + " " + JSON.stringify(result[0].geometry.location)); //Mostra no console a coordenada de cada endereço
                address[index] = {location: result[0].geometry.location, stopover: true};
                if(index == address.length - 1){ //Chegou no final do array
                    return address;
                };
                index++;
                return traduzRota(address, index);
            });
            return address;
        };

});