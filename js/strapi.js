import * as Utils from './utils.js';

const STRAPI_URL = 'https://morning-refuge-32900.herokuapp.com/';

const loading = document.querySelector('.loading');

const showLoader = () => {
  loading.style.top = '0px';
};

const hideLoader = () => {
  loading.style.top = '-10000px';
};

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
