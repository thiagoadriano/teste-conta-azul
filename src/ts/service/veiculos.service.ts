namespace APPCA {
    VeiculosService.$inject = [];
    function VeiculosService() {
        return {
            getAll: _getAll,
            getOne: _getOne,
            save: _save,
            del: _delete,
            find: _find
        }

        function _getAll() {

        }

        function _getOne() {

        }

        function _save() {

        }

        function _delete() {

        }

        function _find() {

        }
    }

    angular
        .module("AppContaAzul")
        .service("VeiculosService", VeiculosService);
}