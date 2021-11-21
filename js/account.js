import { updateLoginBtn, checkAuthorization, updateCartCount } from './utils.js';
import { getProducts } from './strapi.js';
import AccountProduct from './components/account_product.js';

const productsEl = document.querySelector('.acc__products');

updateCartCount('#counter');
updateLoginBtn('#login');
checkAuthorization();

loadProducts();

async function loadProducts() {
  const products = await getProducts();
  products.forEach((product) => {
    productsEl.innerHTML += AccountProduct(product);
  });
}
