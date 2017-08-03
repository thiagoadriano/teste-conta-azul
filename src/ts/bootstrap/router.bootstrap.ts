namespace APPCA {

    Router.$inject = ["$routeProvider"];
    function Router($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when("/veiculos", {
                templateUrl: "views/veiculos.html",
                controller: "VeiculosController",
                controllerAs: "vm"
            })
            .otherwise({
                redirectTo: "/veiculos"
            });
    }

    angular
        .module("AppContaAzul")
        .config(Router);
}