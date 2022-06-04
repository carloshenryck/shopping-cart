const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('deve chamar o método localstorage.getItem', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  })

  it('deve chamar o método localstorage.getItem com os parâmetro corretos', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  })
});
