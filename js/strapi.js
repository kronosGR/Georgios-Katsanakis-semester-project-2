const STRAPI_ULR = 'https://morning-refuge-32900.herokuapp.com/';

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
    const res = await fetch(STRAPI_ULR + 'Home');
    const json = await res.json();
    hideLoader();
    return await json;
  }
  catch (err) {
    console.log(err);
  }
}

