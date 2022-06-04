const fetchProducts = (queryName) => {
  try {
    if (queryName === undefined) throw new Error('You must provide an url'); 
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${queryName}`;
    const data = fetch(url).then((response) => response.json());
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
