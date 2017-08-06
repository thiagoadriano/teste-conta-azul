namespace APPCA {
    VeiculosService.$inject = ["$http", "$q", "MsgInfos"];
    function VeiculosService($http, $q, MsgInfos) {
        let lista = [];
        return {
            getAll: _getAll,
            getOne: _getOne,
            save: _save,
            arualizar: _atualiza,
            del: _delete
        }

        function _getAll() {
            let def = $q.defer();
            if (!lista.length) {
                $http.get("data/conta-azul-dados.json").then((result) => {
                    lista = angular.fromJson(result.data.Veiculos);
                    def.resolve(lista);
                });
            } else {
                def.resolve(lista);
            }
            return def.promise;
        }

        function _getOne(index) {
            return lista[index];
        }

        function _atualiza(obj) {
            let posiIntem = lista.indexOf(obj)
            lista[posiIntem] = obj;
            MsgInfos.success("Veículo atualizado com sucesso!");
        }
        function _save(obj) {
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
    }

    angular
        .module("AppContaAzul")
        .service("VeiculosService", VeiculosService);
}