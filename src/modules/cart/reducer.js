import { ADD_TO_CART } from './actions'
const initialState = {
  cart: [],
  total: 0,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total,
      }
    default:
      return state
  }
}
