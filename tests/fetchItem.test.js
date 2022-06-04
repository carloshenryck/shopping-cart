require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('deve ser uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('deve chamar a função fetch', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  })

  it('deve chamar a função fetch passando o parâmetro correto', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  })

  it('deve retornar o objeto correto', async () => {
    const data = await fetchItem('MLB1615760527');
    expect(data).toEqual(item);
  })

  it('deve retornar erro ao não passar parâmetro', async () => {
    const data = await fetchItem();
    expect(data).toEqual(new Error('You must provide an url'));
  })
});
