import { getProduct, editProduct } from './strapi.js';
import { getQueryString, updateCartCount, updateLoginBtn, validUrl,checkAuthorization } from './utils.js';

const titleEl = document.querySelector('#title');
const priceEl = document.querySelector('#price');
const descEl = document.querySelector('#description');
const featuredEl = document.querySelector('#featured');
const imageEl = document.querySelector('#product-image');
const imageUploadEl = document.querySelector('#image-upload');
const formEl = document.querySelector('.login-form');
const idEl = document.querySelector('#id');
const buttonEl = document.querySelector('form > button');

const image = document.querySelector('#fileupload');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dxyku14kl/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'uploadpreset';

updateCartCount('#counter');
updateLoginBtn('#login');
checkAuthorization();

const id = getQueryString('id');
let product = {};
let imageUploaded = true;

showProduct(id);

async function showProduct(id) {
  const res = await getProduct(id);
  titleEl.value = res.title;
  priceEl.value = res.price;
  descEl.value = res.description;
  featuredEl.checked = res.featured;
  idEl.value = res.id;

  imageEl.src = res.image_url;
  imageEl.alt = res.title;

  validateForm();
}

image.addEventListener('change', async (e) => {
  // show the image upload message
  imageUploadEl.classList.remove('d-none');
  imageUploadEl.classList.add('d-block');
  imageUploaded = false;

  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const res = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url !== '') {
      product.image_url = data.secure_url;

      // show the image to the image preview element
      imageEl.src = product.image_url;

      // hide the message
      imageUploadEl.classList.remove('d-block');
      imageUploadEl.classList.add('d-none');
      imageUploaded = true;
      validateForm();
    }
  } catch (err) {
    console.log(err);
    imageUploaded = false;
  }
});


const validateForm = () => {
  if (
    titleEl.value.length > 5 &&
    parseFloat(priceEl.value) > 0 &&
    descEl.value.length > 5  &&
    imageUploaded
  ) {
    buttonEl.disabled = false;
  } else {
    buttonEl.disabled = true;
  }
};

titleEl.addEventListener('input', validateForm);
priceEl.addEventListener('input', validateForm);
descEl.addEventListener('input', validateForm);

formEl.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  product.title = titleEl.value;
  product.price = priceEl.value;
  product.description = descEl.value;
  product.featured = featuredEl.checked;
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
