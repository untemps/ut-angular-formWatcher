(function () {
    'use strict';

    var module = angular.module('demo', ['ngSanitize', 'untemps.utFormWatcher']);
    module.controller('demoController', ['$rootScope', demoController]);

    function demoController($rootScope) {
        var __this = this;

        __this.myModel = 'Test';

        __this.isValid = false;
        $rootScope.$on('utFormService:formValidityChange', function(event, form, isValid) {
            __this.isValid = isValid;
        });
    }
})();