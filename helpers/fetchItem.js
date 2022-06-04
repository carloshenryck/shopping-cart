const fetchItem = (itemId) => {
  if (itemId === undefined) return new Error('You must provide an url'); 
  const url = `https://api.mercadolibre.com/items/${itemId}`;
  const data = fetch(url).then((response) => response.json());
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
