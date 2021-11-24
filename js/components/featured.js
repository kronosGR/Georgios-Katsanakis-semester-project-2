import * as Strapi from '../strapi.js';
import cart_item from './cart_item.js';

const cont = document.querySelector('.cont');

export default async function () {
  const featuredList = await Strapi.getFeatured();

  let el = `
    <div class="cont__featured ">
      <h2>Featured</h2>
    </div>
    <div class="d-flex flex-column flex-md-row flex-md-wrap justify-content-center">
  `;

  featuredList.forEach((item) => {
    el += cart_item(item);
  });

  el += '</div>';

  cont.innerHTML = el;
}
