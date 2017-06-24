angular.module("siger").factory("serialGenerate", function(){
    var _generateSerial = function(){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

		for (var i = 0; i < 4; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
    };
    
    return {
        generateSerial: _generateSerial
    };
})