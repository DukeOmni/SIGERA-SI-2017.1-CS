angular.module("siger").controller("mapaRotaCtrl", function($scope, GeoCoder, $timeout, GoogleDistanceAPI, NavigatorGeolocation){
    
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
    }, 1000 * $scope.alunos.length); //Seria legal uma barra de carregamento durante esse tempo de processamento

    calcRota(); //Pega os endereços dos alunos que irão na rota

    $scope.waypoint = traduzRota($scope.waypoint, 0); //Traduz os endereços de string para coordenadas


     function calcRota (){ 
        var alunos = $scope.alunos;
        for (var i = 0, len = alunos.length; i < len; i++){
           $scope.waypoint[i] = alunos[i].endereco;
        };
    };

    $scope.mapInit = function(map){
        reorganizarRota($scope.waypoint); //Nesse ponto da execução, $scope.waypoint já é um array adequado para a execução de reorganizarRota
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

    function reorganizarRota(rota){
        var currentPosition = [];
        NavigatorGeolocation.getCurrentPosition().then(function(position) { //Chamada assíncrona para a api do google maps
            currentPosition[0] = position.coords.latitude + "," + position.coords.longitude;
            calculaDistancia(currentPosition, rota).then(function(distancia){ //Após receber o valor da posição atual chamar a função calculaDistancia que retorna a distancia que é recebida pela API do Distance Matrix
                // console.log(JSON.stringify(distancia.rows[0].elements[0].distance.value)); //Como acessar o valor da distancia, como o array rota são justamente os waypoints, temos que as posições de elements e rota são equivalentes, sendo assim o primeiro endereço da rota equivale ao primeiro valor de distância de elements
               
                var distancias = []; //Trecho feito com intenção de deixar o código mais claro
                for(var i = 0, len = distancia.rows[0].elements.length; i < len; i++){
                    distancias[i] = distancia.rows[0].elements[i].distance.value;
                };
                
                
                console.log(distancias.indexOf(Math.min(...distancias)));

            });
        });
    };

    function calculaDistancia(currentPosition, rota){ //Função que recebe a posição atual e o array que corresponde a rota dos alunos
        var rotaAux = [];
        for(var i = 0, len = rota.length; i < len; i++){
            rotaAux[i] = rota[i].location.lat() + "," + rota[i].location.lng();
        };
        var args = {
            origins: currentPosition,
            destinations: rotaAux
        };
        var distancia = GoogleDistanceAPI.getDistanceMatrix(args).then(function(distanceMatrix){
            return distanceMatrix;
        });
        return distancia;
    };
});