angular.module("siger").factory("rotasAPI", function ($http, config)
{
	var _getRotas = function (userId)
	{
		return $http.get(config.baseUrl + "/rotas/" + userId);
	};

	var _saveRota = function (rota)
	{
		return $http.post(config.baseUrl + "/rotas", rota);
	};

	return {
		getRotas: _getRotas,
		saveRota: _saveRota
	};
});