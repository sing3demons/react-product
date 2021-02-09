const ADD_TO_CART = 'app/cart/ADD_TO_CART'
const REMOVE_FROM_CART = 'app/cart/REMOVE_FROM_CART'

function addToCart(product = {}, cart = [], totalPrice = 0) {
  let exists = false
  // let itemPrice = 0
  if (cart.length > 0) {
    for (const c of cart) {
      if (c.id === product.id) {
        c.qty++
        c.total = c.qty * c.price
        // totalPrice = c.total
        exists = true
      }
    }
  }
  if (!exists) {
    cart.push(product)
  }
  const total = cart.reduce((totalQty, product) => totalQty + product.qty, 0)
  totalPrice = +cart.map((c) => c.total)
  return {
    type: ADD_TO_CART,
    payload: {
      cart,
      total,
      price: product.total,
    },
  }
}

function removeFromCart(id, productQty, cart = [], price) {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id,
      cart,
      total: productQty,
      price,
    },
  }
}

export { ADD_TO_CART, addToCart, REMOVE_FROM_CART, removeFromCart }
