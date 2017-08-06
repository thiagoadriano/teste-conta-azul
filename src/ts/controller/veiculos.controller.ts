namespace APPCA {
    VeiculosController.$inject = ['VeiculosService', 'NgTableParams', 'MarcasService', 'VeiculosModel', 'UtilHelpers'];
    function VeiculosController(VS, NgTableParams, MS, VeiculosModel, Util) {
        let vm = this;
        vm.lista = <Array<IVeiculos>>[];
        vm.listaMarcas = [];
        vm.listaModelos = [];
        vm.titleModal = "Incluir";
        vm.allChecks = false;
        vm.Model = VeiculosModel.model();
        vm.tableView = tableParams();
        vm.selecionaModelos = selecionaModelos;
        vm.abrirModal = abrirModal;
        vm.editar = editar;
        vm.salvar = salvar;
        vm.excluir = excluir;
        vm.validaPlaca = validaPlaca;
        vm.marqueAllChecks = marqueAllChecks;
        vm.ativaLinha = ativaLinha;

        init();

        function excluir(veiculo) {
            Util.excluir(veiculo.placa, () => {

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
            let veiculo = Util.searchItemId(vm.lista, id);
            vm.Model = veiculo;
            vm.titleModal = "Editar";
            selecionaModelos();
            $("#veiculosModal").modal("show");
        }

        function salvar(isValid) {
        }

        function validaPlaca() {
            var data = vm.Model.placa.toLowerCase(),
                patterns = {
                    texto: /[a-z]{1,3}/,
                    numero: /[0-9]{1,4}/,
                    placa: /[a-z]{3}-[0-9]{4}/
                };
            if (patterns.placa.test(data)) {
                return vm.Model.placa = data.toUpperCase();
            } else if (patterns.texto.test(data)) {
                return vm.Model.placa = data.toUpperCase();
            } else {
                vm.Model.placa = "";
            }
        }

        function getVeiculos() {
            VS.getAll().then((veiculos) => {
                vm.lista = veiculos;
                vm.lista.forEach(item => {
                    item.valorCorrigido = "R$ " + (+item.valor).toLocaleString() + ",00";
                    item.nomeImagem = Util.getNomeImagemLink(item.imagem);
                    item.linhaAtiva = false;
                });
                vm.tableView.settings({
                    dataset: vm.lista
                });
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