angular.module("siger").factory("alunosAPI", function($http, config){
    var _getAlunos = function(){
        return $http.get(config.baseUrl + "/alunos");
    };

    var _saveAluno = function(aluno){
		return $http.post(config.baseUrl + "/alunos", aluno).then(function (response)
		{
			alert(response.data);
		});
	};

	var _deleteAluno = function (aluno)
	{
		return $http.delete(config.baseUrl + "/alunos/" + aluno._id).then(function (response)
		{
			console.log(response.data);
		});
	};
    return {
        getAlunos: _getAlunos,
		saveAluno: _saveAluno,
		deleteAluno: _deleteAluno
    };
});