import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector("input[type='email']");
const messageRef = document.querySelector("textarea[name='message']");

formRef.addEventListener(`input`, throttle(handleInputSave, 500));
formRef.addEventListener('submit', handleFormSubmit);

let inputSaveObj = {};

function handleInputSave(e) {
  inputSaveObj.email = inputRef.value;
  inputSaveObj.message = messageRef.value;
  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(inputSaveObj));
}

function onFormInitialisation() {
  let inputSaveObj = {};
  inputSaveObj = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE) || '');

  inputRef.value = inputSaveObj.email || '';
  messageRef.value = inputSaveObj.message || '';
}

onFormInitialisation();

function handleFormSubmit(e) {
  e.preventDefault();
  let inputSaveObj = {};
  inputSaveObj = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE));
  // e.currentTarget.reset();
  // const saveMessage = localStorage.getItem(FEEDBACK_FORM_STATE);

  if (inputSaveObj) {
    console.log(inputSaveObj.email, inputSaveObj.message);
    localStorage.removeItem(FEEDBACK_FORM_STATE);
    inputRef.value = '';
    messageRef.value = '';
  }
}
