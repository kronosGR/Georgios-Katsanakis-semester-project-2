import { updateLoginBtn, checkAuthorization, updateCartCount } from './utils.js';
import { getProducts, deleteProduct } from './strapi.js';
import AccountProduct from './components/account_product.js';

const productsEl = document.querySelector('.acc__products');

updateCartCount('#counter');
updateLoginBtn('#login');
checkAuthorization();

loadProducts();

async function loadProducts() {
  productsEl.innerHTML = '';
  let products = await getProducts();
  products.forEach((product) => {
    productsEl.innerHTML += AccountProduct(product);
  });

  const deleteBtns = document.querySelectorAll('#delete');
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', async (evt) => {
      const id = evt.currentTarget.dataset.id;
      const response = confirm('Are you sure you want to delete this product');
      if (response) {
        await deleteProduct(id);
        const feedback = document.querySelector('.feedback');
        loadProducts();
        feedback.style.display = 'inline';
        feedback.style.height = '65px';
        setTimeout(() => {
          feedback.style.display = 'none';
          feedback.style.height = '0px';          
        }, 6000);
      }
    });
  });
}
