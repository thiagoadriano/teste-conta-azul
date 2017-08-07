namespace APPCA {
    VeiculosService.$inject = ["$http", "$q", "MsgInfos", "UtilHelpers"];
    function VeiculosService($http, $q, MsgInfos, Util) {
        let lista = [];
        return {
            BuscarTodos: _getAll,
            BuscarUm: _getOne,
            Salvar: _save,
            Atualizar: _atualiza,
            Deletar: _delete,
            existePlaca: existePlaca,
            testaPlaca: testaPlaca
        }

        function _getAll() {
            let def = $q.defer();
            if (!lista.length) {
                $http.get("data/conta-azul-dados.json").then((result) => {
                    lista = angular.fromJson(result.data.Veiculos);
                    prepareLista();
                    def.resolve(lista);
                });
            } else {
                prepareLista();
                def.resolve(lista);
            }

            return def.promise;
        }

        function prepareLista() {
            lista.forEach(item => {
                item.valorCorrigido = "R$ " + (+item.valor).toLocaleString() + ",00";
                item.nomeImagem = Util.getNomeImagemLink(item.imagem);
                item.linhaAtiva = false;
            });
        }

        function _getOne(id) {
            let item = Util.searchItemId(lista, id)
            return item;
        }

        function _atualiza(obj) {
            if (!testaPlaca(obj.placa)) return;

            let posiIntem = lista.indexOf(obj);
            obj.valor = obj.valor.replace(/\./g, '');
            lista[posiIntem] = obj;
            MsgInfos.success("Veículo atualizado com sucesso!");
        }

        function _save(obj) {
            if (!testaPlaca(obj.placa)) return;
            if (existePlaca(obj.placa)) return;
            if (obj.valor !== 0) obj.valor = obj.valor.replace(/\./g, '');
            lista.push(obj);
            MsgInfos.success("Veículo cadastrado com sucesso!");
        }

        function _delete(veiculo) {
            let item = lista.indexOf(veiculo);
            if (item >= 0) {
                lista.splice(item, 1);
                MsgInfos.success("Veículo excluido com sucesso!");
            }
        }

        function existePlaca(placa) {
            let i = lista.length;
            while (i--) {
                if (lista[i].placa === placa) {
                    MsgInfos.danger("Já existe um veículo cadastrado com a placa informada");
                    return true;
                }
            }
            return false;
        }

        function testaPlaca(placa) {
            let pattern = /[a-zA-Z]{3}-[0-9]{4}/;
            if (!pattern.test(placa)) {
                MsgInfos.danger("A placa não está no formato correto");
                return false;
            }
            return true;
        }
    }

    angular
        .module("AppContaAzul")
        .service("VeiculosService", VeiculosService);
}