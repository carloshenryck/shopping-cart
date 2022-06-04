const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addProducts = async () => {
  const section = document.querySelector('.items');
  const search = await fetchProducts('computador');
  const { results } = search;

  results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;

    const item = createProductItemElement({ sku, name, image });
    section.appendChild(item);
  });
};

const addToCartListener = () => {
  const addToCartButton = document.querySelectorAll('.item__add');

  addToCartButton.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const cartList = document.querySelector('.cart__items');
      const item = event.target.parentElement;
      const itemId = getSkuFromProductItem(item);
      const itemInfo = await fetchItem(itemId);

      const { id: sku, title: name, price: salePrice } = itemInfo;
      const cartElement = createCartItemElement({ sku, name, salePrice });
      cartList.appendChild(cartElement);
    });
  });
};

window.onload = async () => { 
  await addProducts();
  addToCartListener();
};
