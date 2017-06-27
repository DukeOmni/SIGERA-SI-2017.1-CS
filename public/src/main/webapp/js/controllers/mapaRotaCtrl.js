angular.module("siger").controller("mapaRotaCtrl", function ($scope, $rootScope, GeoCoder, GoogleDistanceAPI, NavigatorGeolocation, serialGenerate, rotasAPI)
{

	var user = firebase.auth().currentUser;

	$scope.alunos = $rootScope.rotaAtual.alunosDaRota; //Carrega da tela de gerar rota os alunos que foram selecionados pelo usuário

	$scope.destino = $rootScope.rotaAtual.destino;	//Carrega o destino da tela de gerar rota

	$scope.waypoint = []; //Inicialização do array dos pontos de parada da rota

	$scope.googleMapUrl = "https://maps.google.com/maps/api/js"; //Definição da url da API do google para usar posteriormente no lazy-load do mapa definido na tag html da view

	$scope.pauseLoading = true; //Variável que "trava" o carregamento da div que contém o mapa

    $scope.travelMode = "DRIVING";
 
    calcRota(); //Pega os endereços dos alunos que irão na rota

    $scope.waypoint = traduzRota($scope.waypoint, 0); //Traduz os endereços de string para coordenadas

	//Função que preenche o array de pontos de parada com os endereços dos alunos que irão na rota
	function calcRota()
	{ 
		var alunos = $scope.alunos;

		//Colocando os pontos de paradas das casas dos alunos
		for (var i = 0, len = alunos.length; i < len; i++)
		{ 
			$scope.waypoint[i] = alunos[i].endereco;
		};

    };

	//Função que executa após a inicialização do mapa
	$scope.mapInit = function (map)
	{  
        reorganizarRota($scope.waypoint);	//Nesse ponto da execução, $scope.waypoint já é um array adequado para a execução de reorganizarRota      
	};

	//Função que traduz os enderenços em string para coordenada
	function traduzRota(address, index)
	{ 
            var addressAux = address[index];

			//Chamada a API da google de GEOCODIFICAÇÃO, passando como parâmetro um endereço em string e recebendo como resultado um array que contém a resposta
			GeoCoder.geocode({ address: addressAux }).then(function (result) 
			{ 
                console.log(addressAux + " " + JSON.stringify(result[0].geometry.location)); //Mostra no console a coordenada de cada endereço

				address[index] = { location: result[0].geometry.location, stopover: true };   //Atribui ao array que será retornado para o array dos pontos de parada o objeto no modelo requerido para criar a rota no mapa

				//Chegou no final do array
				if (index == address.length - 1)
				{ 
                    $scope.pauseLoading = false; //Assim que traduzir para coordenada o último endereço da rota, pode carregar o mapa

					return address;     //Retorna o array de coordenadas para o array de pontos de parada
				};

				index++;    

                
				return traduzRota(address, index);      //Chamada recursiva da própria função caso não tenha chegado ao final do array

			});

			return address;
		
        };

		// Função que reorganiza as coordenadas dos pontos de parada para que a rota tenha o caminho mínimo
		function reorganizarRota(rota)
		{ 
			console.log("Reorganizando a rota");

			var currentPosition = [];

			NavigatorGeolocation.getCurrentPosition().then(function (position) 
			{ 
				currentPosition[0] = position.coords.latitude + "," + position.coords.longitude;

				//Após receber o valor da posição atual chamar a função calculaDistancia que retorna a distancia que é recebida pela API do Distance Matrix  
				calculaDistancia(currentPosition, rota).then(function (distancia)
				{            
					var distancias = []; //Trecho feito com intenção de deixar o código mais claro

					for (var i = 0, len = distancia.rows[0].elements.length; i < len; i++)
					{
						distancias[i] = {distancia: distancia.rows[0].elements[i].distance.value, coordenada: rota[i].location}; // Armazena a resposta enviada pela API da google em um objeto para deixar o código mais claro posteriormente.
					};

					var auxArray = []; //Inicializa vetor auxiliar vazio

					var menorAux; 

					for (var x = 0, len = distancias.length; x < len; x++) // Armazena as distâncias retornadas pela API da google no array auxiliar
					{
						auxArray[x] = distancias[x].distancia;
					};

					//Laço responsável por reorganizar a rota para obter o caminho mínimo
					for (var i = 0, len = rota.length; i < len; i++)
					{ 
						menorAux = auxArray.indexOf(Math.min(...auxArray)); // A variável menorAux recebe o índice da menor distância do array atual
                    
						for (var j = 0, len = distancias.length; j < len; j++) // Então percorre-se o array de distâncias buscando a menor distância
						{
							if(distancias[j].distancia == Math.min(...auxArray)){ //Quando encontra, armazena no array final de rotas a distância que é atualmente a menor
								rota[i].location = distancias[j].coordenada; //Note que a posição que é escrita no array final de rotas é i, ou seja, para cada posição desse array é procurada a menor distância para então atribuir ao array final.
							};
						};

						auxArray.splice(menorAux, 1); // Tira a menor distância do array auxiliar e inicia o laço de novo.

					};

					$scope.rotaCompleta = {origem: currentPosition, waypoint: $scope.waypoint, destino: $scope.destino, data: new Date(), serial: serialGenerate.generateSerial(), user: user.uid}; //Essa linha serve para armazenar a rota em um objeto e mandar para o banco

					rotasAPI.saveRota($scope.rotaCompleta).then(function ()
					{
						if (detectmob())
						{ //Testa se é dispositivo mobile após reorganizar a rota
							chamarGoogleMapSite();
						};

					});

				});

			});

		};

		//Função que recebe a posição atual e o array que corresponde a rota dos alunos
		function calculaDistancia(currentPosition, rota)
		{
		
			var rotaAux = [];

			//Preparando o array dos pontos de parada para ser usado como argumento na chamada a API Distance Matrix que retorna a distancia de cada um do ponto de origem
			for (var i = 0, len = rota.length; i < len; i++)
			{
			
            rotaAux[i] = rota[i].location.lat() + "," + rota[i].location.lng();

			};

			var args = {
				origins: currentPosition,
				destinations: rotaAux
			};

			// Chamada a função da API DistanceMatrix da google passando o objeto preparado como parâmetro
			var distancia = GoogleDistanceAPI.getDistanceMatrix(args).then(function(distanceMatrix){
				return distanceMatrix;
			});

			return distancia;

		};

		//Função que redireciona para o site do google maps
		var chamarGoogleMapSite = function ()
		{ 

			// Base da string de chamada a página do google maps com parâmetros
			var url = "https://www.google.com/maps/dir/?api=1&origin=Current+Location&waypoints=";

			//Laço que concatena a url com as coordenadas dos pontos de parada da rota
			for (var i = 0, len = $scope.waypoint.length; i < len; i++)
			{
				if (i == $scope.waypoint.length - 1)
				{
					url = url + $scope.waypoint[i].location.lat() + "," + $scope.waypoint[i].location.lng();
				} else
				{
					url = url + $scope.waypoint[i].location.lat() + "," + $scope.waypoint[i].location.lng() + "|";
				};
			};

			//Formata o destino para concatenar com a string da url
			$scope.destino = $scope.destino.split(' ').join('+');

			url = url + "&destination=" + $scope.destino + "&travelmode=" + $scope.travelMode;

			// Faz uma chamada a essa url
			location.href = url;

		};

		function detectmob() 
		{ //Função que testa se a aplicação está rodando em algum dispositivo mobile
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