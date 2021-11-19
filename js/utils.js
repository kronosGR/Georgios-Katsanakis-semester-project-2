const CART = 'cart';

/**
 * @description Show an error to the screen
 * @param msg Message to display
 */
export function showError(msg) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  const html = `
    <img src="/assets/error.jpg" alt="error"/>
    <p class="error-text">${msg}</p>
  `;
  errorDiv.innerHTML = html;

  document.body.appendChild(errorDiv);

  window.setTimeout(() => {
    document.body.removeChild(errorDiv);
  }, 3000);
}

/**
 * @description get a specific query string
 * @param key the name of the key to get
 */
export function getQueryString(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/**
 * @description updates the title and the description for the document
 * @param title the title of the document
 * @param desc the description meta tag of the document
 */
export function updateTitleAndDescription(title, desc) {
  document.title += ' ' + title;
  document.querySelector('meta[name="description"]').setAttribute('content', desc);
}

/**
 * @description add a product to the card
 * @param product a product object
 */
export function addToCart(product) {
  if (!checkIfInCart(product)) {
    const cart = getCart();
    cart.push(product);
    localStorage.setItem(CART, JSON.stringify(cart));
  }
}

/**
 * @description remove a product from the cart
 * @param product the product to be removed
 */
export function removeFromCart(product) {
  const cart = getCart();
  const filteredCart = cart.filter((item) => {
    return item.id !== product.id;
  });
  localStorage.setItem(CART, JSON.stringify(filteredCart));
}

/**
 * @description get the shopping cart
 */
export function getCart() {
  return JSON.parse(localStorage.getItem(CART)) || [];
}

/**
 * @description check if a product exists in the cart
 * @param product a product object
 */
export function checkIfInCart(product) {
  const cart = getCart();
  let inCart = false;

  cart.forEach((item) => {
    if (item.id === product.id) {
      inCart = true;
    }
  });
  return inCart;
}

/**
 * @description update the cart count number
 * @param el the cart counter element selector
 */
export function updateCartCount(el) {
  const counter = document.querySelector(el);
  const total = getCart().length;
  counter.innerText = `(${total})`;
}
