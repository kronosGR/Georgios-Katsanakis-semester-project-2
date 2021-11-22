export default function (id) {
  return `
    <a href="account_edit.html?id=${id}" class="col-1 mx-3 product-item__delete" title="Edit Product">
      <img class="product-item__delete" src="/assets/icons/edit.png" alt="delete product"/>
    </a>
  `;
}
