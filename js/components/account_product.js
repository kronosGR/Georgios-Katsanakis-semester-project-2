import DeleteProduct from './account_product_delete.js';
import EditProduct from './account_product_edit.js'

export default function (item) {
  return `
    <div log class="d-flex flex-nowrap align-items-center col-12 product-item" href="product-details.html?id=${item.id}">
      <img class="col-1 product-item__img" src="${item.image_url}" alt="${item.title}"/>
      <span class="col-5 product-item__title">${item.title}</span> 
      <span class="col-1 product-item__price">$${item.price.toFixed(2)}</span>
      ${EditProduct(item.id)}
      ${DeleteProduct(item.id)}
    </div>
    <hr>
  `;
}
