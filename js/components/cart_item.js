export default function (data) {
  const item = `
  <div class="cart">
      <a href="product-details.html?id=${data.id}" class="cart__link" >
        <span class="cart__title">${data.title}</span>
        <img src="${data.image.url}" alt="${data.title}" class="cart__img" />
        <p class="cart__description">${data.description.slice(0,50)}...</p>
        <div class="cart__footer">
          <div class="cart__price">$${Number(data.price).toFixed(2)}</div>
          <span class="cart__info">More...</span>
        </div>
      </a>
    </div>
  `;

  return item;
}
