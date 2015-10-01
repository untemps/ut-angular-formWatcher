(function () {
    'use strict';

    var module = angular.module('untemps.utFormWatcher', []);
    module.constant('utFormServiceChannel', {
        FORM_VALIDITY_CHANGE: 'utFormService:formValidityChange',
        ALL_FORMS_VALIDITY_CHANGE: 'utFormService:allFormsValidityChange'
    });
    module.factory('Form', [Form]);
    module.service('utFormService', ['$rootScope', 'utFormServiceChannel', 'Form', utFormService]);
    module.directive('utFormWatcher', ['utFormService', utFormWatcher]);

    /**
     * @ngdoc service
     * @name Form
     * @description Form object.
     *
     */
    function Form() {
        return function (name, isValid) {
            var __this = this;

            __this.name = name;
            __this.isValid = isValid;
        };
    }

    /**
     * @ngdoc service
     * @name utFormService
     * @description Manage the forms.
     *
     */
    function utFormService($rootScope, utFormServiceChannel, Form) {
        /*jshint validthis: true */
        var __this = this;

        __this.forms = [];

        __this.registerForm = function (name) {
            var form = __this.getForm(name);
            if (!form) {
                form = new Form(name, false);
                __this.forms.push(form);
            }
            return form === null;
        };

        __this.unregisterForm = function (name) {
            var form = __this.getForm(name);
            if (form) {
                __this.forms.splice(__this.forms.indexOf(form), 1);
            }
            return form !== null;
        };

        __this.unregisterAllForms = function () {
            while (__this.forms.length > 0) {
                __this.unregisterForm(__this.forms[0].name);
            }
            return __this.forms.length === 0;
        };

        __this.registeredFormCount = function () {
            return __this.forms.length;
        };

        __this.areAllFormsValid = function () {
            var result = true;
            var i = 0;
            while (result && i < __this.forms.length) {
                var form = __this.forms[i];
                if (!form.isValid) {
                    result = false;
                }
                i++;
            }
            return result;
        };

        __this.isFormValid = function (name) {
            var result = false;
            var form = __this.getForm(name);
            if (form) {
                result = form.isValid;
            }
            return result;
        };

        __this.setFormValidity = function (name, isValid) {
            var form = __this.getForm(name);
            if (form) {
                form.isValid = isValid;
            }

            $rootScope.$emit(utFormServiceChannel.FORM_VALIDITY_CHANGE, name, isValid);
            $rootScope.$emit(utFormServiceChannel.ALL_FORMS_VALIDITY_CHANGE, __this.areAllFormsValid());

            return form !== null;
        };

        __this.getForm = function (name) {
            var result = null;
            var i = 0;
            while (!result && i < __this.forms.length) {
                var form = __this.forms[i];
                if (form.name === name) {
                    result = form;
                }
                i++;
            }
            return result;
        };
    }

    /**
     * @ngdoc directive
     * @name utFormWatcher
     * @description Watch for form validation changes and notify the utFormService.
     *
     */
    function utFormWatcher(utFormService) {

        function controller($scope) {
            /*jshint validthis: true */
            var __this = this;

            __this.name = null;
            __this.element = null;
            __this.ngFormCtrl = null;

            __this.init = function (name, element, ngFormCtrl) {
                __this.name = name || ngFormCtrl.$name;
                __this.element = element;
                __this.ngFormCtrl = ngFormCtrl;

                utFormService.registerForm(__this.name);

                __this.unwatchFormValidity = $scope.$watch(function () {
                    return __this.ngFormCtrl.$valid;
                }, __this.setValidity, true);
            };

            __this.setValidity = function (isValid) {
                utFormService.setFormValidity(__this.name, isValid);
            };

            $scope.$on('$destroy', function () {
                __this.unwatchFormValidity();
                __this.name = null;
                __this.element = null;
                __this.ngFormCtrl = null;
            });
        }

        function link(scope, element, attrs, ngFormCtrl) {
            var ctrl = scope.ctrl;
            ctrl.init(attrs.utFormWatcher, element, ngFormCtrl);
        }

        return {
            restrict: 'A',
            require: '?form',
            scope: {},
            controller: ['$scope', controller],
            controllerAs: 'ctrl',
            bindToController: true,
            link: link
        };
    }
})();