import { ADD_TO_CART, REMOVE_FROM_CART } from './actions'
const initialState = {
  cart: [],
  total: 0,
  productId: [],
  price: 0,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
        price: action.payload.price,
      }
    case REMOVE_FROM_CART:
      let cartCount = state.cart.filter((c) => c.id !== action.payload.id)
      let total = action.payload.total

      return {
        ...state,
        cart: cartCount,
        total: state.total - total,
      }
    default:
      return state
  }
}
