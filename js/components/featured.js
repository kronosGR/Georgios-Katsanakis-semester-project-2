import * as Strapi from '../strapi.js';
import featured_item from './featured_item.js';

const cont = document.querySelector('.cont');

export default async function () {
  const featuredList = await Strapi.getFeatured();
  
  let el = `
    <div class="cont__featured">
      <h2>Featured</h2>
    </div>
  `

  featuredList.forEach(item => {
    el += featured_item(item);
  })

  cont.innerHTML = el;
}
