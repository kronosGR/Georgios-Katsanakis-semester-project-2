import { updateCartCount, getCart, updateLoginBtn } from './utils.js';
import shoppingCart_item from './components/shopping-cart_item.js';

const cont = document.querySelector('.cont');

// update the item
updateCartCount('#counter');
updateLoginBtn('#login');

showCart();

async function showCart() {
  const cart = getCart();

  if (cart.length > 0) {
    let sum = 0;

    cart.forEach((item) => {
      cont.innerHTML += shoppingCart_item(item);
      sum += item.price;
    });

    cont.innerHTML += `
    <div class="shopping-cart__total">
     Total: $${Number(sum).toFixed(2)}
    </div>
    `;
  } else {
    // show cart is empty
    cont.innerHTML = '<span class="no-result">No products in your shopping cart!</span>';
  }
}
