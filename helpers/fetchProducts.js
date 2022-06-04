const fetchProducts = (queryName) => {
  if (queryName === undefined) return new Error('You must provide an url'); 
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${queryName}`;
  const data = fetch(url).then((response) => response.json());
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
