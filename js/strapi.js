import * as Utils from './utils.js';

const STRAPI_URL = 'https://morning-refuge-32900.herokuapp.com/';

const loading = document.querySelector('.loading');

const showLoader = ()=> {
  loading.style.top = "0px";
}

const hideLoader = () => {
  loading.style.top = "-10000px";

}

export async function getHero() {
  showLoader();
  try {
    const res = await fetch(STRAPI_URL + 'Home');
    const json = await res.json();
    hideLoader();
    return json;
  }
  catch (err) {
    Utils.showError('Sorry for the inconvenience. Something is out of order');
    console.log(err);
    hideLoader();
  }
}

export async function getFeatured(){
  showLoader();
  try{
    const res = await fetch(STRAPI_URL+ 'products?featured=true')
    const json = await res.json();
    hideLoader();
    return json;
  } catch (err){
    Utils.showError('Sorry for the inconvenience. Something is out of order');
    console.log(err);
    hideLoader();    
  }
}

