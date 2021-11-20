import * as Utils from './utils.js';

const STRAPI_URL = 'https://morning-refuge-32900.herokuapp.com/';

const loading = document.querySelector('.loading');

/**
 * @description show loader
 */
const showLoader = () => {
  loading.style.top = '0px';
};

/**
 * @description hide loader
 */
const hideLoader = () => {
  loading.style.top = '-10000px';
};

/**
 * @description get hero banner from strapi backend
 */
export async function getHero() {
  showLoader();
  try {
    const res = await fetch(STRAPI_URL + 'Home');
    const json = await res.json();
    hideLoader();
    return json;
  } catch (err) {
    Utils.showError('Sorry for the inconvenience. Something is out of order');
    console.log(err);
    hideLoader();
    return null;
  }
}

/**
 * @description get featured products from strapi backend
 */
export async function getFeatured() {
  showLoader();
  try {
    const res = await fetch(STRAPI_URL + 'products?featured=true');
    const json = await res.json();
    hideLoader();
    return json;
  } catch (err) {
    Utils.showError('Sorry for the inconvenience. Something is out of order');
    console.log(err);
    hideLoader();
    return null;
  }
}

/**
 * @description get specific program from strapi backend
 * @param id the id of the product to be fetched
 */
export async function getProduct(id) {
  try {
    showLoader();
    const res = await fetch(STRAPI_URL + 'products/' + id);
    const json = await res.json();
    hideLoader();
    return json;
  } catch (err) {
    Utils.showError('Sorry for the inconvenience. Something is out of order');
    console.log(err);
    hideLoader();
    return null;
  }
}

/**
 * @description get products by filter or not
 * @param search the term that will be user to fetch the products. If no term provided
 *                then all products will be fetched
 */
export async function getFilteredProducts(search) {
  const urlExtra = search
    ? 'products/?_where[_or][0][title_contains]=' +
      search +
      '&_where[_or][1][description_contains]=' +
      search
    : 'products/';

  try {
    showLoader();
    const res = await fetch(STRAPI_URL + urlExtra);
    const json = await res.json();
    hideLoader();
    return json;
  } catch (err) {
    Utils.showError('Sorry for the inconvenience. Something is out of order');
    console.log(err);
    hideLoader();
    return null;
  }
}

export async function login(email, password){
  try{
    showLoader();
    const data = JSON.stringify({
      identifier: email,
      password: password
    })
    const res = await fetch(STRAPI_URL+'auth/local', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json();
    hideLoader();
    return json;
  }catch(err){
    Utils.showError('Sorry for the inconvenience. Something is out of order');
    console.log(err);
    hideLoader();
    return null;
  }
}