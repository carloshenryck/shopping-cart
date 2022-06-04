require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('deve chamar a função fetch', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  })

  it('deve chamar a função fetch passando o parâmetro correto', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(url);
  })

  it('deve retornar o objeto correto', async () => {
    const data = await fetchProducts('computador');
    expect(data).toEqual(computadorSearch);
  })

  it('deve retornar erro ao não passar parâmetro', async () => {
    const data = await fetchProducts();
    expect(data).toEqual(new Error('You must provide an url'));
  })
});

