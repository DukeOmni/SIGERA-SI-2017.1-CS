angular.module("siger").controller("dashboardCtrl", function ($scope, $state, $rootScope, $window) {
    $scope.viewMenu = true;
    $scope.slide = '';
    $scope.detectMobile = function(){ //Função que testa se a aplicação está rodando em algum dispositivo mobile
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    $scope.mudarViewMenu = function(){
        var id = "#" + $state.current.name.substring(10);
        if($scope.viewMenu == true){
            $scope.viewMenu = false;
            angular.element(document.querySelector(id))[0].style.width = "98%";    
        }else{
            $scope.viewMenu = true;
            angular.element(document.querySelector(id))[0].style.width = "78%";
        }
    };

    $rootScope.$on('$stateChangeStart', function(){
    $scope.slide = $scope.slide || 'slide-left'
  });
  
    $rootScope.back = function(){
    $scope.slide = 'slide-right';
    $window.history.back();
  }  
  
  $rootScope.forward = function(){
    $scope.slide = 'slide-left';
    $window.history.forward();
  }
});