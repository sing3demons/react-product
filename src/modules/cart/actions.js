const ADD_TO_CART = 'app/cart/ADD_TO_CART'
const REMOVE_FROM_CART = 'app/cart/REMOVE_FROM_CART'

function addToCart(product = {}, cart = []) {
  let exists = false
  // let itemPrice = 0
  if (cart.length > 0) {
    for (const c of cart) {
      if (c.id === product.id) {
        c.qty++
        product.total = c.qty * c.price

        exists = true
      }
    }
  }
  if (!exists) {
    cart.push(product)
  }
  const total = cart.reduce((totalQty, product) => totalQty + product.qty, 0)

  return {
    type: ADD_TO_CART,
    payload: {
      cart,
      total,
      price: product.total * product.price,
    },
  }
}

function removeFromCart(id, productQty, cart = []) {
  //   localStorage.setItem('cart', JSON.stringify(cart))
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id,
      cart,
      total: productQty,
    },
  }
}

export { ADD_TO_CART, addToCart, REMOVE_FROM_CART, removeFromCart }
