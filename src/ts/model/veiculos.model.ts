namespace APPCA {
    function VeiculosModel(): IVeiculos {
        return {
            combustivel: "",
            imagem: "",
            marca: "",
            modelo: "",
            placa: "",
            valor: 0
        }
    }

    angular
        .module("AppContaAzul")
        .factory("VeiculosModel", VeiculosModel);
}