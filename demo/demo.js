(function () {
    'use strict';

    var module = angular.module('demo', ['ngSanitize', 'untemps.utFormWatcher']);
    module.controller('demoController', ['$rootScope', 'utFormService', 'utFormServiceChannel', demoController]);

    function demoController($rootScope, utFormService, utFormServiceChannel) {
        var __this = this;

        __this.model1 = 'Test 1';
        __this.model2 = 'Test 2';
        __this.model3 = 'Test 3';

        __this.isForm1Valid = false;
        __this.isForm2Valid = false;
        __this.isForm3Valid = false;
        __this.areAllFormsValid = false;

        $rootScope.$on(utFormServiceChannel.FORM_VALIDITY_CHANGE, function(event, formName, isValid) {
            switch(formName) {
                case 'form1':
                    __this.isForm1Valid = isValid;
                    break;
                case 'form2':
                    __this.isForm2Valid = isValid;
                    break;
                case 'form3':
                    __this.isForm3Valid = isValid;
                    break;
            }
        });

        $rootScope.$on(utFormServiceChannel.ALL_FORMS_VALIDITY_CHANGE, function(event, isValid) {
            __this.areAllFormsValid = isValid;
        });
    }
})();