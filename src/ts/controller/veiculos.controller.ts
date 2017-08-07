namespace APPCA {
    VeiculosController.$inject = ['VeiculosService', 'NgTableParams', 'MarcasService', 'VeiculosModel', 'UtilHelpers', '$filter'];
    function VeiculosController(VS, NgTableParams, MS, VeiculosModel, Util, $filter) {
        let vm = this;
        let oldList = [];
        vm.lista = <Array<IVeiculos>>[];
        vm.listaMarcas = [];
        vm.listaModelos = [];
        vm.titleModal = "Incluir";
        vm.allChecks = false;
        vm.search = '';
        vm.Model = VeiculosModel.model();


        vm.tableParams = tableParams();
        vm.selecionaModelos = selecionaModelos;
        vm.abrirModal = abrirModal;
        vm.editar = editar;
        vm.salvar = salvar;
        vm.excluir = excluir;
        vm.validaPlaca = validaPlaca;
        vm.marqueAllChecks = marqueAllChecks;
        vm.ativaLinha = ativaLinha;
        vm.upper = upper;
        vm.corrigeValor = corrigeValor;
        vm.filtrar = filtrar;
        vm.numeros = numeros;

        init();

        function numeros() {
            if (vm.Model.valor) {
                return vm.Model.valor = vm.Model.valor.replace(/\D/g, '');
            }
        }

        function filtrar() {
            if (!vm.search && oldList.length) {
                vm.lista = angular.copy(oldList);
                vm.tableParams = tableParams();
                oldList = [];
            } else if (vm.search) {
                if (!oldList.length) oldList = angular.copy(vm.lista);
                vm.lista = $filter('filter')(vm.lista, vm.search);
                vm.tableParams = tableParams();
            }
        }

        function excluir(veiculo) {
            Util.excluir(veiculo.placa, () => {
                VS.Deletar(veiculo);
                getVeiculos();
            });
        }

        function marqueAllChecks() {
            vm.lista.forEach(item => {
                if (vm.allChecks) {
                    item.linhaAtiva = true;
                } else {
                    item.linhaAtiva = false;
                }
            });
        }

        function ativaLinha(linha) {
            linha.linhaAtiva = !linha.linhaAtiva;
            vm.allChecks = false;
        }

        function tableParams() {
            let config = {
                initialParams: {
                    count: 5
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
            vm.listaModelos = [];
            vm.Model = VeiculosModel.model();
            $("#veiculosModal").modal("show");
        }

        function selecionaModelos() {
            vm.listaModelos = [];
            if (vm.Model.marca) {
                vm.listaModelos = MS.getModelos(vm.Model.marca);
            }
        }

        function editar(id: number) {
            let veiculo = VS.BuscarUm(id);
            vm.Model = veiculo;
            vm.titleModal = "Editar";
            selecionaModelos();
            $("#veiculosModal").modal("show");
        }

        function salvar(isValid) {
            if (!isValid) return;

            if (vm.Model.hasOwnProperty("id")) {
                VS.Atualizar(vm.Model);
            } else {
                VS.Salvar(vm.Model);
            }

            getVeiculos();
            $("#veiculosModal").modal("hide");
        }

        function validaPlaca() {
            VS.testaPlaca(vm.Model.placa);
            VS.existePlaca(vm.Model.placa);
        }

        function upper() {
            let data = vm.Model.placa;
            if (!data) return;
            return vm.Model.placa = data.toUpperCase();
        }

        function corrigeValor() {
            if (/\D/g.test(vm.Model.valor)) return;
            let valor = vm.Model.valor.replace(/\./g, '');
            return vm.Model.valor = (+valor).toLocaleString();
        }

        function getVeiculos() {
            VS.BuscarTodos().then((veiculos) => {
                vm.lista = veiculos;
                vm.tableParams = tableParams();
            });
        }

        function init() {

            getVeiculos();

            MS.getMarcas().then((result) => {
                vm.listaMarcas = result;
            });

            $(document).on('click', '[data-toggle="lightbox"]', function (event) {
                event.preventDefault();
                $(this).ekkoLightbox();
            });
        }

    }

    angular
        .module("AppContaAzul")
        .controller("VeiculosController", VeiculosController);
}