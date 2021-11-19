export default function (item) {
  return `
    <a class="shop-cart-item" href="product-details.html?id=${item.id}">
      <img class="shop-cart-item__img" src="${item.image.formats.thumbnail.url}" alt="${item.title}"/>
      <span class="shop-cart-item__title">${item.title} - <span class="shop-cart-item__title--link">More...</span> </span>
      <span class="shop-cart-item__price">$${item.price}</span>
    </a>
  `;
}
