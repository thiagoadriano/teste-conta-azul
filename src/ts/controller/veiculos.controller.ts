namespace APPCA {
    VeiculosController.$inject = ['VeiculosService', 'NgTableParams', 'MarcasService', 'VeiculosModel'];
    function VeiculosController(VS, NgTableParams, MS, VeiculosModel) {
        let vm = this;
        vm.lista = <Array<IVeiculos>>[];
        vm.listaMarcas = [];
        vm.listaModelos = [];
        vm.titleModal = "Incluir";
        vm.Model = VeiculosModel.Model;
        vm.tableView = tableParams();
        vm.selecionaModelos = selecionaModelos;
        vm.abrirModal = abrirModal;

        init();

        function tableParams() {
            let config = {
                initialParams: {
                    count: 2
                },
                initialSettings: {
                    counts: [],
                    paginationMaxBlocks: 13,
                    paginationMinBlocks: 2,
                    dataset: vm.lista
                }
            }
            return new NgTableParams(config.initialParams, config.initialSettings);
        }

        function abrirModal() {
            vm.titleModal = "Incluir";
            $("#veiculosModal").modal("show");
        }

        function selecionaModelos() {
            vm.listaModelos = [];
            if (vm.Model.marca) {
                vm.listaModelos = MS.getModelos(vm.Model.marca);
            }
        }

        function init() {

            VS.getAll().then((veiculos) => {
                vm.lista = veiculos;
                vm.tableView.settings({
                    dataset: vm.lista
                });
            });

            MS.getMarcas().then((result) => {
                vm.listaMarcas = result;
            });

            $("#veiculosModal").on("hide.bs.modal", () => {
                vm.listaModelos = [];
                vm.Model = VeiculosModel.Model;
                $("#veiculos").get(0).reset();
            });
        }

    }

    angular
        .module("AppContaAzul")
        .controller("VeiculosController", VeiculosController);
}