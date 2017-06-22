angular.module("siger").factory("serialGenerate", function(){
    var _generateSerial = function(){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 3; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
    };
    
    return {
        generateSerial: _generateSerial
    };
})