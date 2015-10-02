# ut-angular-formWatcher

Angular directive that let you control all the forms of your application in a centralized way.

You can simply register a form by adding the attribute ut-form-watcher on the form tag.  
You will be informed of every changes of validation status by listening specific events dispatched on the root scope for a single form or for all the registered forms.  
You can programmatically check the validation status for each form using the utFormService API.

### Installation

Install via bower :

```shell
bower install ut-angular-formWatcher
```

### Usage

Add it as a dependency to your app:

```javascript
angular.module('app', ['untemps.utFormWatcher']);
```

Register each form to be controlled by the directive using the attribute 'ut-form-watcher' on the form tag:

```html
<form name="myForm" novalidate ut-form-watcher>
```

By default, the form will be registered with the value of the name attribute but you can specify a registration name like this:

```html
<form name="myForm" novalidate ut-form-watcher="registeredForm">
```

### 'utFormService' API

* `unregisterForm(formName)`:  
Unregister a form. The service will stop listening for the validation status changes.  
Return true if the form exists in the registration list.
    * `formName`: Registration name of the form.



* `unregisterAllForms()`:  
Unregister all the forms.  
The service will stop listening for the validation status changes.
Return true if all the forms has been unregistered.



* `registeredFormCount()`  
Return the number of registered forms.



* `isFormValid(formName)`  
Return true if the form specified by its registration name is valid.
    * `formName`: Registration name of the form.



* `areAllFormsValid()`  
Return true if all the registered forms are valid.



* `setFormValidity(formName, isValid)`  
Explicitly set the validation status for a form.  
Return true if the form exists in the registration list.
    * `formName`: Registration name of the form.
    * `isValid`: True if the form should be set to valid.



* `getForm(formName)`  
Return a Form instance containing the name and the validation status of the form specified by its registration name.  
    * `formName`: Registration name of the form.

### Development

Install Gulp via npm if you don't have it:

```shell
npm install -g gulp
```

### Available commands

* `gulp`: build and test the project
* `gulp build`: build the project and make new files in`dist`
* `gulp serve`: start a server to serve the demo page and launch a browser then watches for changes in `src` files to reload the page
* `gulp test`: run tests
* `gulp serve-test`: runs tests and keep test browser open for development. Watches for changes in source and test files to re-run the tests

### License
MIT  
Thanks to send me an email when using this directive (v.lebadezet@untemps.net).