angular
    .module('electricTomato')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when("/", {
            controller: "HomeController",
            controllerAs: "vm",
            templateUrl: "home/home.html"
        }).otherwise({
            redirectTo: "/"
        });
    }]);