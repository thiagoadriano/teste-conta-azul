namespace APPCA {
    function UtilHelpers() {

        return {
            searchItemId: searchItemId,
            getNomeImagemLink: getNomeImagemLink,
            excluir: excluir
        };

        function searchItemId(lista: Array<any>, idItem: number) {
            lista.sort((a, b) => {
                return a.id > b.id;
            });

            let listaTamanho = lista.length,
                meioLista = Math.round(listaTamanho / 2),
                posiStart = idItem <= meioLista ? 0 : meioLista;

            for (let i = posiStart; i < idItem; i++) {
                if (lista[i].id === idItem) {
                    return lista[i];
                }
            }
            return null;
        }

        function getNomeImagemLink(link) {
            if (!link) return;

            var linkSplit = link.split("/");
            var nome = linkSplit[linkSplit.length - 1];

            nome = nome.replace(/\.[a-z]{3,4}$/, '');
            nome = nome.replace(/(_|\.)/g, ' ');

            return nome.substring(0, 18);
        }

        function excluir(registro, callbackSim, callbackNao, title, msg) {
            if (!callbackSim) return;

            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                size: BootstrapDialog.SIZE_SMALL,
                title: title || "Excluir Registro",
                message: msg || `Deseja realmente excluir o registro: <br><strong>${registro}</strong>?`,
                buttons: [
                    {
                        label: 'Não',
                        cssClass: 'btn-default',
                        action: function (dialog) {
                            dialog.close();
                            if (callbackNao) {
                                callbackNao();
                            }
                        }
                    },
                    {
                        label: 'Sim',
                        cssClass: 'btn-danger',
                        action: function (dialog) {
                            dialog.close();
                            callbackSim();
                        }
                    }
                ]
            });

        }
    }

    angular
        .module("AppContaAzul")
        .factory("UtilHelpers", UtilHelpers);
}