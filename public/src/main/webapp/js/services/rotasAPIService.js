angular.module("siger").factory("rotasAPI", function ($http, config)
{
	var _getRotas = function ()
	{
		return $http.get(config.baseUrl + "/rotas");
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