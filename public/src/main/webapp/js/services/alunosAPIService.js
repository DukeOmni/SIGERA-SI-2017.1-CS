angular.module("siger").factory("alunosAPI", function($http, config){
    var _getAlunos = function(){
        return $http.get(config.baseUrl + "/alunos");
    };

    var _saveAluno = function(aluno){
        return $http.post(config.baseUrl + "/alunos", aluno);
    };
    return {
        getAlunos: _getAlunos,
        saveAluno: _saveAluno
    };
});