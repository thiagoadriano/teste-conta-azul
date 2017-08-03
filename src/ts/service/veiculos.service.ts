namespace APPCA {
    VeiculosService.$inject = ["$http", "$q"];
    function VeiculosService($http, $q) {
        let lista = [];
        return {
            getAll: _getAll,
            getOne: _getOne,
            save: _save,
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

        function _save(obj) {
            lista.push(obj);
        }

        function _delete(index) {
            lista.splice(index, 1);
        }
    }

    angular
        .module("AppContaAzul")
        .service("VeiculosService", VeiculosService);
}