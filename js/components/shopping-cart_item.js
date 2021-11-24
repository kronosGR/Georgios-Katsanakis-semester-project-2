export default function (item) {
  return `
    <a class="d-flex flex-nowrap align-items-center col-12 shop-cart-item" href="product-details.html?id=${item.id}">
      <img class="col-1 shop-cart-item__img" src="${item.image_url}" alt="${item.title}"/>
      <span class="col-7 shop-cart-item__title">${item.title} - <span class="shop-cart-item__title--link">More...</span> </span>
      <span class="col-2 col-md-3 text-end shop-cart-item__price">$${item.price.toFixed(2)}</span>
    </a>
  `;
}
