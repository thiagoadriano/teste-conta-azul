namespace APPCA {
    VeiculosController.$inject = ['VeiculosService', 'NgTableParams'];
    function VeiculosController(VS, NgTableParams) {
        let vm = this;
        vm.lista = <Array<IVeiculos>>[];

        VS.getAll().then((veiculos) => {
            vm.lista = veiculos;
            debugger;
            vm.tableView.settings({
                dataset: vm.lista
            });
        });

        vm.tableParams = function () {
            var initialParams = {
                count: 2
            };
            var initialSettings = {
                counts: [],
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                dataset: vm.lista
            };
            return new NgTableParams(initialParams, initialSettings);
        }

        vm.tableView = vm.tableParams();


    }

    angular
        .module("AppContaAzul")
        .controller("VeiculosController", VeiculosController);
}