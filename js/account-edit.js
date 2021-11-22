import { getProduct, upload, editProduct } from './strapi.js';
import { getQueryString, updateCartCount, updateLoginBtn } from './utils.js';

const titleEl = document.querySelector('#title');
const priceEl = document.querySelector('#price');
const descEl = document.querySelector('#description');
const featuredEl = document.querySelector('#featured');
const imageUp = document.querySelector('#image');
const imageEl = document.querySelector('#product-image');
const formEl = document.querySelector('.login-form');
const idEl = document.querySelector('#id');

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
}

formEl.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  product.title = titleEl.value;
  product.price = priceEl.value;
  product.description = descEl.value;
  product.featured = featuredEl.checked;
  product.image_url = imageUp.value;
  await editProduct(product, idEl.value);

  showProduct(idEl.value);
});
