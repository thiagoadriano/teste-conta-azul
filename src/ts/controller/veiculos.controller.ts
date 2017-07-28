module APPCA {
    VeiculosController.$inject = ['$scope'];
    function VeiculosController() {
        let vm = this;
        vm.title = "Teste Novo";
    }

    angular
        .module("appContaAzul")
        .controller("VeiculosController", VeiculosController);
}