import { getProduct, editProduct } from './strapi.js';
import { getQueryString, updateCartCount, updateLoginBtn, validUrl } from './utils.js';

const titleEl = document.querySelector('#title');
const priceEl = document.querySelector('#price');
const descEl = document.querySelector('#description');
const featuredEl = document.querySelector('#featured');
const imageUp = document.querySelector('#image');
const imageEl = document.querySelector('#product-image');
const formEl = document.querySelector('.login-form');
const idEl = document.querySelector('#id');
const buttonEl = document.querySelector('form > button');

updateCartCount('#counter');
updateLoginBtn('#login');

const id = getQueryString('id');
let product = {};

showProduct(id);

async function showProduct(id) {
  const res = await getProduct(id);
  titleEl.value = res.title;
  priceEl.value = res.price;
  descEl.value = res.description;
  featuredEl.checked = res.featured;
  imageUp.value = res.image_url;
  idEl.value = res.id;

  imageEl.src = res.image_url;
  imageEl.alt = res.title;

  validateForm();
}

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
  await editProduct(product, idEl.value);

  showProduct(idEl.value);
  const feedback = document.querySelector('.feedback');  
  window.scrollTo(0,0);
  feedback.style.display = 'inline';
  feedback.style.height = '65px';
  setTimeout(() => {
    feedback.style.display = 'none';
    feedback.style.height = '0px';
  }, 6000);
});
