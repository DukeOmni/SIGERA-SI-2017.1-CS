angular.module("siger").controller("mapaRotaCtrl", function($scope, GeoCoder, GoogleDistanceAPI, NavigatorGeolocation){
    
    $scope.alunos = [{nome: "Alex", endereco: "Aparecida de Goiânia, Rua 512", instituicao: "UFG", telefone: "Exemplo1"},
    {nome: "Joao", endereco: "Goiânia, Praça Cívica", instituicao: "Exemplo2", telefone: "Exemplo2"},
    {nome: "Maria", endereco: "Goiânia, Setor Bueno", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Caio", endereco: "Goiânia, Setor Universitário", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Vitor", endereco: "Aparecida de Goiânia, Cidade empresarial", instituicao: "Exemplo1", telefone: "Exemplo1"},
    {nome: "Ana", endereco: "Aparecida de Goiânia, Vila Brasília", instituicao: "Exemplo1", telefone: "Exemplo1"}
    ]; //Carregaria do backend o array de alunosRota para poder calcular a rota;

    $scope.destino = "Goiânia, UFG campus samambaia"; //Destino pode ser carregado do backend
    $scope.waypoint = []; //Inicialização do array dos pontos de parada da rota
    $scope.googleMapUrl = "https://maps.google.com/maps/api/js"; //Definição da url da API do google para usar posteriormente no lazy-load do mapa definido na tag html da view
    $scope.pauseLoading = true; //Variável que "trava" o carregamento da div que contém o mapa
    $scope.travelMode = "DRIVING";
    //Substitui o tempo de carregamento pelo tempo de processamento dos dados iniciais da rota :)

    calcRota(); //Pega os endereços dos alunos que irão na rota

    $scope.waypoint = traduzRota($scope.waypoint, 0); //Traduz os endereços de string para coordenadas


     function calcRota (){ //Função que preenche o array de pontos de parada com os endereços dos alunos que irão na rota
        var alunos = $scope.alunos;
        for (var i = 0, len = alunos.length; i < len; i++){
           $scope.waypoint[i] = alunos[i].endereco;
        };
    };

    $scope.mapInit = function(map){  //Função que executa após a inicialização do mapa
        reorganizarRota($scope.waypoint);//Nesse ponto da execução, $scope.waypoint já é um array adequado para a execução de reorganizarRota      
};

    function traduzRota(address, index){ //Função que traduz os enderenços em string para coordenada
            var addressAux = address[index];
            
            GeoCoder.geocode({address: addressAux}).then(function (result) { //Chamada a API da google de GEOCODIFICAÇÃO, passando como parâmetro um endereço em string e recebendo como resultado um array que contém a resposta
                console.log(addressAux + " " + JSON.stringify(result[0].geometry.location)); //Mostra no console a coordenada de cada endereço
                address[index] = {location: result[0].geometry.location, stopover: true};   //Atribui ao array que será retornado para o array dos pontos de parada o objeto no modelo requerido para criar a rota no mapa
                if(index == address.length - 1){ //Chegou no final do array
                    $scope.pauseLoading = false; //Assim que traduzir para coordenada o último endereço da rota, pode carregar o mapa
                    return address;     //Retorna o array de coordenadas para o array de pontos de parada
                };
                index++;    
                return traduzRota(address, index);      //Chamada recursiva da própria função caso não tenha chegado ao final do array
            });
            return address; 
        };

    function reorganizarRota(rota){ //Função que reorganiza as coordenadas dos pontos de parada para que a rota tenha o caminho mínimo
        console.log("Reorganizando a rota");
        var currentPosition = [];
        NavigatorGeolocation.getCurrentPosition().then(function(position) { //Chamada assíncrona para a api do google maps
            currentPosition[0] = position.coords.latitude + "," + position.coords.longitude;
            calculaDistancia(currentPosition, rota).then(function(distancia){ //Após receber o valor da posição atual chamar a função calculaDistancia que retorna a distancia que é recebida pela API do Distance Matrix             
                var distancias = []; //Trecho feito com intenção de deixar o código mais claro
                for(var i = 0, len = distancia.rows[0].elements.length; i < len; i++){
                    distancias[i] = {distancia: distancia.rows[0].elements[i].distance.value, coordenada: rota[i].location};
                };
                var auxArray = [];
                var menorAux;
                for(var x = 0, len = distancias.length; x < len; x++){
                    auxArray[x] = distancias[x].distancia;
                };
                for(var i = 0, len = rota.length; i < len; i++){ //Laço responsável por reorganizar a rota para obter o caminho mínimo
                    menorAux = auxArray.indexOf(Math.min(...auxArray));
                    
                    for(var j = 0, len = distancias.length; j < len; j ++){
                        if(distancias[j].distancia == Math.min(...auxArray)){
                            rota[i].location = distancias[j].coordenada;
                        };
                    };
                    auxArray.splice(menorAux, 1);
                };
                if(detectmob()){ //Testa se é dispositivo mobile após reorganizar a rota
                chamarGoogleMapSite();
                };
            });
        });
    };

    function calculaDistancia(currentPosition, rota){ //Função que recebe a posição atual e o array que corresponde a rota dos alunos
        var rotaAux = [];
        for(var i = 0, len = rota.length; i < len; i++){ //Preparando o array dos pontos de parada para ser usado como argumento na chamada a API Distance Matrix que retorna a distancia de cada um do ponto de origem
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

   var chamarGoogleMapSite = function (){ //Função que redireciona para o site do google maps
        var url = "https://www.google.com/maps/dir/?api=1&origin=Current+Location&waypoints=";
        for(var i = 0, len = $scope.waypoint.length; i < len; i++){
            if(i == $scope.waypoint.length - 1){
                url = url + $scope.waypoint[i].location.lat() + "," + $scope.waypoint[i].location.lng();
            }else{
                url = url + $scope.waypoint[i].location.lat() + "," + $scope.waypoint[i].location.lng() + "|";
            };
        };
        $scope.destino = $scope.destino.split(' ').join('+');
        url = url + "&destination=" + $scope.destino + "&travelmode=" + $scope.travelMode;
        location.href = url;
    };

    function detectmob() { //Função que testa se a aplicação está rodando em algum dispositivo mobile
        if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){
            return true;
        }
            else {
                return false;
            }
        }
    });