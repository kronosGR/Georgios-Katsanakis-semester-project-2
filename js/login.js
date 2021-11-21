import { isEmailValid, setAuth, updateLoginBtn } from './utils.js';
import { login } from './strapi.js';

const emailEl = document.querySelector('#email');
const passEl = document.querySelector('#password');
const errorEl = document.querySelector('#error');
const buttonEl = document.querySelector('form button');
const form = document.querySelector('form');

updateLoginBtn('#login');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const res = await login(emailEl.value, passEl.value);

  if (res.error) {
    errorEl.classList.remove('d-none');
  } else {
    errorEl.classList.add('d-none');
    setAuth(res.jwt);

    // redirect to account page
    window.location.href = '/account.html';
  }
});

email.addEventListener('input', (evt) => {
  checkFields();
});

passEl.addEventListener('input', (evt) => {
  checkFields();
});

const checkFields = () => {
  if (isEmailValid(emailEl.value) && passEl.value.length > 3) {
    buttonEl.disabled = false;
  } else {
    buttonEl.disabled = true;
  }
};
