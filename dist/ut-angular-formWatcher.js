/*!
 * angular-directive-boilerplate
 * https://github.com/mohsen1/angular-directive-boilerplate
 * Version: 0.0.8 - 2015-07-13T10:09:37.248Z
 * License: MIT
 */


(function () {
    'use strict';

    var module = angular.module('untemps.ut-formWatcher');
    module.factory('Form', [Form]);
    module.service('utFormService', ['Form', formService]);
    module.directive('utFormWatcher', ['formService', formWatcher]);

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
     * @name formService
     * @description Manage the forms.
     *
     */
    function formService(Form) {
        var __this = this;

        __this.forms = [];

        __this.registerForm = function(name) {
            var form = __this.getForm(name);
            if(!form) {
                form = new Form(name, false);
                __this.forms.push(form);
            }
            return form === null;
        };

        __this.unregisterForm = function(name) {
            var form = __this.getForm(name);
            if(form) {
                __this.forms.splice(__this.forms.indexOf(form), 1);
            }
            return form !== null;
        };

        __this.areAllFormsValid = function() {
            var result = true;
            var i = 0;
            while(result && i < __this.forms.length) {
                var form = __this.forms[i];
                if(!form.isValid) {
                    result = false;
                }
                i++;
            }
            return result;
        };

        __this.setFormValidity = function(name, isValid) {
            var form = __this.getForm(name);
            if(form) {
                form.isValid = isValid;
            }
            return form !== null;
        };

        __this.getForm = function(name) {
            var result = null;
            var i = 0;
            while(!result && i < __this.forms.length) {
                var form = __this.forms[i];
                if(form.name === name) {
                    result = form;
                }
                i++;
            }
            return result;
        };
    }

    /**
     * @ngdoc directive
     * @name formWatcher
     * @description Watch for form validation changes and notify the formService.
     *
     */
    function formWatcher(formService) {

        function controller($scope) {
            var __this = this;

            __this.name = null;
            __this.element = null;
            __this.ngFormCtrl = null;

            __this.init = function (name, element, ngFormCtrl) {
                __this.name = name || ngFormCtrl.$name;
                __this.element = element;
                __this.ngFormCtrl = ngFormCtrl;

                formService.registerForm(__this.name);

                __this.unwatchFormValidity = $scope.$watch(function () {
                    return __this.ngFormCtrl.$valid;
                }, __this.setValidity, true);
            };

            __this.setValidity = function (isValid) {
                formService.setFormValidity(__this.name, isValid);
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
            ctrl.init(attrs.formWatcher, element, ngFormCtrl);
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