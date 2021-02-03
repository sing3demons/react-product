import {
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
} from './actions'
const initialState = {
  isLoading: false,
  items: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST:
      return { ...state, isLoading: true, items: [] }
    case LOAD_PRODUCTS_SUCCESS:
      return { ...state, isLoading: false, items: action.payload.products }
    case LOAD_PRODUCTS_FAILURE:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
