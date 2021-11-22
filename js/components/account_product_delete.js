export default function (id) {
  return `
    <a href="#" id="delete" data-id=${id} class="col-1 mx-3 product-item__delete" title="Delete Product">
      <img class="product-item__delete" src="/assets/icons/delete.png" alt="delete product"/>
    </a>
  `;
}
