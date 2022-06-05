const cartList = document.querySelector('.cart__items');

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

const updateTotalPrice = () => {
  const valueElement = document.querySelector('.total-price');
  let totalValue = 0;
  cartList.childNodes.forEach((item) => {
    const value = item.innerHTML.split('$')[1];
    totalValue += parseFloat(value, 10);
  });
  valueElement.innerHTML = Math.round(totalValue * 100) / 100;
};

const updateLocalStorage = () => {
  saveCartItems(cartList.innerHTML);
};

const cartItemClickListener = (event) => {
  event.target.remove();
  updateLocalStorage();
  updateTotalPrice();
};

const getFromLocalStorage = () => {
  const savedList = localStorage.getItem('cartItems');
  cartList.innerHTML = savedList;
  cartList.childNodes.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  }); 
  updateTotalPrice();
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
      const item = event.target.parentElement;
      const itemId = getSkuFromProductItem(item);
      const itemInfo = await fetchItem(itemId);

      const { id: sku, title: name, price: salePrice } = itemInfo;
      const cartElement = createCartItemElement({ sku, name, salePrice });
      cartList.appendChild(cartElement);
      updateLocalStorage();
      updateTotalPrice();
    });
  });
};

document.querySelector('.empty-cart')
.addEventListener('click', () => {
  while (cartList.firstChild) {
    cartList.removeChild(cartList.lastChild);
  }
  updateTotalPrice();
  updateLocalStorage();
});

const isLoading = (argument) => {
  if (argument) { 
    const items = document.querySelector('.items');
    const element = document.createElement('div');
    element.classList.add('loading');
    element.innerHTML = 'carregando...';
    items.appendChild(element);
  } else { 
    document.querySelector('.loading').remove();
  }
};

window.onload = async () => { 
  isLoading(true);
  await addProducts();
  isLoading(false);
  addToCartListener();
  getFromLocalStorage();
};
