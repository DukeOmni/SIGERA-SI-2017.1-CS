angular.module("siger",["ui.router", "ngMap", "angular.google.distance"]);
angular.module("siger").run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});