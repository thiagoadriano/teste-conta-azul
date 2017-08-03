namespace APPCA {
    appRun.$inject = [];
    function appRun() {

    }

    angular
        .module('AppContaAzul', ["ngRoute", "ngTable"])
        .run(appRun);
}