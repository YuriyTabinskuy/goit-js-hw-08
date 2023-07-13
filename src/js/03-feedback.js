import throttle from 'lodash.throttle';

// key for the storage
const STORAGE_KEY = 'feedback-form-state';

// select feedback form and destructuring email and message from form elements
const formEl = document.querySelector('.feedback-form');

// create form data variable
let formData = {};

// add listeners for the input fields and submit button
formEl.addEventListener('input', throttle(onDataInput, 500));
formEl.addEventListener('submit', onFormSubmit);

// save input data to the local storage and formData var
function onDataInput(evt) {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// console log for input data, checks if all the fields are filled out, reset localstorage and form data
function onFormSubmit(e) {
  e.preventDefault();

  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  formData = {};
}

const onLoad = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    formData = JSON.parse(data);
    Object.entries(formData).forEach(([key, val]) => {
      formEl.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
};

window.addEventListener('load', onLoad);
