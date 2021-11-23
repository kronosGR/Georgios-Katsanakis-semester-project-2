const CART = 'cart';
const AUTH = 'auth';

/**
 * @description check if an email address is valid
 * @param email the email to be checked
 */
export const isEmailValid = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

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
 * @description check if an url address is valid
 * @param url the url to be checked
 */
export function validUrl(url) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i'); 
  return !!pattern.test(url);
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

/**
 * @description toggle to login or logout depending the auth status
 * @param el the cart counter element selector
 */
export function updateLoginBtn(el) {
  const login = document.querySelector(el);
  const account = document.querySelector('#account');
  if (checkIfLoggedIn()) {
    login.innerHTML = `
      <img src="assets/icons/logout.png" alt="logout" class="nav__icon" />
      Logout
    `
    login.addEventListener('click', (evt) => {
      evt.preventDefault();
      logout();
      window.location.reload();
    });
    account.style.display = 'inline';
  } else {
    login.innerHTML = `
      <img src="assets/icons/login.png" alt="home" class="nav__icon" />
      Login
    `
    login.href = 'login.html';
    account.style.display = 'none';
  }
}

/**
 * @description check if the user is authorized to use the page
 *              if not will be redirected to home page
 */
export function checkAuthorization() {
  if (!checkIfLoggedIn()) window.location.href = '/';
}

/**
 * @description set authorization to localstorage
 * @param jwt login js web token
 */
export function setAuth(jwt) {
  localStorage.setItem(AUTH, jwt);
}

/**
 * @description logout user by deleting from localstorage the jwt
 */
export function logout() {
  localStorage.removeItem(AUTH);
}

/**
 * @description return the jwt for future use
 */
export function getToken() {
  return localStorage.getItem(AUTH) || '';
}

/**
 * @description check if user is logged in
 */
export function checkIfLoggedIn() {
  return getToken().length > 1 ? true : false;
}
