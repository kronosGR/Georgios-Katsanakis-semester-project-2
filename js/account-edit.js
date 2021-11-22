import { getProduct } from './strapi.js'
import { getQueryString, updateCartCount, updateLoginBtn } from './utils.js'

const titleEl = document.querySelector("#title")
const priceEl = document.querySelector("#price")
const descEl = document.querySelector("#description")
const featuredEl = document.querySelector("#featured")
const imageEl = document.querySelector("#product-image")


updateCartCount('#counter');
updateLoginBtn('#login');

const id = getQueryString("id");

showProduct(id);


async function showProduct(id){
  const res = await getProduct(id);
  titleEl.value = res.title;
  priceEl.value = res.price;
  descEl.value = res.description;
  featuredEl.checked = res.featured;

  imageEl.src = res.image.url;
  imageEl.alt = res.title;

  console.log(res)
}