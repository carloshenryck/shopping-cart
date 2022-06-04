const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('deve chamar o método localstorage.setItem', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();
  })

  it('deve chamar o método localstorage.setItem com os parâmetro corretos', () => {
    const parm = '<ol><li>Item</li></ol>';
    saveCartItems(parm);
    expect(localStorage.setItem).toBeCalledWith('cartItems', parm);
  })
});
