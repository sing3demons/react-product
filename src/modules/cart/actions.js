const ADD_TO_CART = 'ADD_TO_CART'

function addToCart(productId) {
  return {
    type: ADD_TO_CART,
    payload: { productId: productId },
  }
}

export { ADD_TO_CART, addToCart }
