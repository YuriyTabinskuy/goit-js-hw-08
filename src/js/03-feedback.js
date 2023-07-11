import throttle from 'lodash.throttle';

// key for the storage
const STORAGE_KEY = 'feedback-form-state';

// select feedback form and destructuring email and message from form elements
const formEl = document.querySelector('.feedback-form');
const { email, message } = formEl.elements;

// create form data variable
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// recovery of input data
populateInputData();

// add listeners for the input fields and submit button
formEl.addEventListener('input', throttle(onDataInput, 500));
formEl.addEventListener('submit', onFormSubmit);

// save input data to the local storage and formData var
function onDataInput() {
  formData = { email: email.value, message: message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// console log for input data, checks if all the fields are filled out, reset localstorage and form data
function onFormSubmit(e) {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert('Please fill out all the fields! :)');
  }

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  formData = {};
}

// uses for populate data after reloading
function populateInputData() {
  if (formData) {
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}