namespace APPCA {
    function UtilHelpers() {

        return {
            searchItemId: searchItemId,
            getNomeImagemLink: getNomeImagemLink
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

            return nome.substring(0, 25);
        }
    }

    angular
        .module("AppContaAzul")
        .factory("UtilHelpers", UtilHelpers);
}