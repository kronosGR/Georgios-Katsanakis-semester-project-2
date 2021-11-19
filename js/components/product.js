import { getProduct } from '../strapi.js';
import {
  updateTitleAndDescription,
  checkIfInCart,
  addToCart,
  removeFromCart,
  updateCartCount
} from '../utils.js';

export default async function (id) {
  const el = document.querySelector('main');
  const product = await getProduct(id);

  updateTitleAndDescription(product.title, product.description);

  const html = `
  <h1 class="mt-5">${product.title}</h1>
  <div class="product-cont">

    <img src="${product.image.url}" alt="${product.title}" class="product-cont__img" />
    <p class="product-cont__desc">${product.description}</p>
    <div class="product-cont__footer">
      <div class="product-cont__price">$${product.price}</div>
      <a href="#" class="product-cont__cta">Add to cart</a>
    </div>

  </div>
  `;

  el.innerHTML = html;

  let btn = document.querySelector('.product-cont__cta');
  updateButton(product, btn);

  btn.addEventListener('click', (evt) => {
    if (checkIfInCart(product)) {
      removeFromCart(product);
      updateButton(product, btn);
    } else {
      addToCart(product);
      updateButton(product, btn);
    }
  });
}

const updateButton = (product, button) => {
  const inCart = checkIfInCart(product);
  if (inCart) {
    button.innerText = 'Remove from Cart';
  } else {
    button.innerText = 'Add to Cart';
  }
  updateCartCount('#counter');
};
