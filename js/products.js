import { updateCartCount } from './utils.js';
import { getFilteredProducts } from './strapi.js';
import Cart_item from './components/cart_item.js';

const el = document.querySelector('.cart-container');
const searchEl = document.querySelector('#search');

// update the item
updateCartCount('#counter');

showProducts();

async function showProducts(term) {
  const products = await getFilteredProducts(term);
  el.innerHTML = '';

  if (products.length > 0) {
    products.forEach((product) => {
      el.innerHTML += Cart_item(product);
    });
  } else {
    el.innerHTML = '<span class="no-result">No products found</span>';
  }
}

searchEl.addEventListener('input', (evt) => {
  const term = evt.target.value;
  showProducts(term);
})