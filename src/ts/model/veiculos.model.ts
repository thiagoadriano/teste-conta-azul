namespace APPCA {
    function VeiculosModel(): IVeiculos {
        let Model = {
            combustivel: "",
            imagem: "",
            marca: "",
            modelo: "",
            placa: "",
            valor: 0
        };

        function getModel() {
            return Model;
        }

        return {
            model: getModel
        };
    }

    angular
        .module("AppContaAzul")
        .factory("VeiculosModel", VeiculosModel);
}