"use strict";

function initFormValidation() {
    class FormValidator {
        constructor() {
            this.form = document.querySelector('form');
            this.fields = [
                { element: this.form.querySelector('#first-name'), requiredMessage: 'First name is required', invalidMessage: 'Invalid first name', validationFunction: this.isNameValid },
                { element: this.form.querySelector('#last-name'), requiredMessage: 'Last name is required', invalidMessage: 'Invalid last name', validationFunction: this.isNameValid },
                { element: this.form.querySelector('#email'), requiredMessage: 'Email is required', invalidMessage: 'Provide a valid email address', validationFunction: this.isValidEmail },
                { element: this.form.querySelector('#password'), requiredMessage: 'Password is required', invalidMessage: 'Password must be at least 8 characters', validationFunction: this.isPasswordValid },
                { element: this.form.querySelector('#confirm-password'), requiredMessage: 'Confirm Password is required', invalidMessage: 'Passwords do not match', validationFunction: this.arePasswordsMatching }
            ];
        }

        initForm() {
            this.form.addEventListener('submit', e => {
                e.preventDefault(); 
                this.validateInputs(); 
            });
        }

        setStatus(element, message, isSuccess) {
            const inputControl = element.parentElement;
            const errorDisplay = inputControl.querySelector('.error');

            if (errorDisplay) {
                errorDisplay.innerText = isSuccess ? '' : message;
            }

            inputControl.classList.toggle('success', isSuccess);
            inputControl.classList.toggle('error', !isSuccess);
        }

        setError(element, message) {
            this.setStatus(element, message, false);
        }

        setSuccess(element) {
            this.setStatus(element, '', true);
        }

        validateInputs() {
            const passwordValue = this.form.querySelector('#password').value.trim();
            const confirmPasswordValue = this.form.querySelector('#confirm-password').value.trim();

            this.fields.forEach(field => {
                const value = field.element.value.trim();
                const isValid = value !== '' && field.validationFunction.call(this, value);
                this.setStatus(field.element, field.invalidMessage, isValid);
            });

            const passwordsMatch = this.arePasswordsMatching(passwordValue, confirmPasswordValue);

            this.setStatus(this.form.querySelector('#confirm-password'), 'Passwords do not match', passwordsMatch);

            const hasInvalidFields = this.fields.some(field => !field.element.classList.contains('success'));

            if (!hasInvalidFields && passwordsMatch) {
                this.form.submit(); 
            }
        }

        isValidEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        isPasswordValid(password) {
            return password.length >= 8;
        }

        arePasswordsMatching(password, confirmPassword) {
            return password === confirmPassword;
        }

        isNameValid(name) {
            return /^[a-zA-Z]+$/.test(name);
        }
    }

    const formValidator = new FormValidator();
    formValidator.initForm();
}

initFormValidation();

