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

        return {
            model: Model
        };
    }

    angular
        .module("AppContaAzul")
        .factory("VeiculosModel", VeiculosModel);
}