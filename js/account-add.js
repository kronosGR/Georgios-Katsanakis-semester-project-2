import { addProduct } from './strapi.js';
import { updateCartCount, updateLoginBtn, validUrl } from './utils.js';

const titleEl = document.querySelector('#title');
const priceEl = document.querySelector('#price');
const descEl = document.querySelector('#description');
const featuredEl = document.querySelector('#featured');
const imageUp = document.querySelector('#image');
const imageEl = document.querySelector('#product-image');
const formEl = document.querySelector('.login-form');
const buttonEl = document.querySelector('form > button');

updateCartCount('#counter');
updateLoginBtn('#login');

let product = {};

const validateForm = () => {
  if (
    titleEl.value.length > 5 &&
    parseFloat(priceEl.value) > 0 &&
    descEl.value.length > 5 &&
    validUrl(imageUp.value)
  ) {
    buttonEl.disabled = false;
  } else {
    buttonEl.disabled = true;
  }
};

titleEl.addEventListener('input', validateForm);
priceEl.addEventListener('input', validateForm);
descEl.addEventListener('input', validateForm);
imageUp.addEventListener('input', () => {
  imageEl.src = imageUp.value;
  validateForm();
});

formEl.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  product.title = titleEl.value;
  product.price = priceEl.value;
  product.description = descEl.value;
  product.featured = featuredEl.checked;
  product.image_url = imageUp.value;
  console.log(await addProduct(product));

  const feedback = document.querySelector('.feedback');
  formEl.reset()
  feedback.style.display = 'inline';
  feedback.style.height = '65px';
  setTimeout(() => {
    feedback.style.display = 'none';
    feedback.style.height = '0px';
  }, 6000);
});
