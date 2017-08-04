namespace APPCA {
    MarcasService.$inject = ["$http", "$q"];
    function MarcasService($http, $q) {
        let listaMarcas = [],
            listaModelos = {},
            def = $q.defer();

        $http.get("data/marcas-veiculos.json").then((result) => {
            let res = angular.fromJson(result.data);
            listaMarcas = res.Marcas;
            listaModelos = res.Modelos;
            def.resolve(listaMarcas);
        });


        return {
            getMarcas: _getMarcas,
            getModelos: _getModelos
        }

        function _getMarcas() {
            return def.promise;
        }

        function _getModelos(modelo: string): Array<string> {
            return listaModelos[modelo];
        }

    }

    angular
        .module("AppContaAzul")
        .service("MarcasService", MarcasService);
}