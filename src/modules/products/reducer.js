import {
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCT_REQUEST,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
} from './actions'

const initialState = {
  isLoading: false,
  items: [],
  paging: {},
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST:
    case LOAD_PRODUCT_REQUEST:
      return { ...state, isLoading: true, items: [] }
    case LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.products,
        paging: action.payload.paging,
      }
    case LOAD_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, items: [action.payload.product] }
    case LOAD_PRODUCTS_FAILURE:
    case LOAD_PRODUCT_FAILURE:
      return { ...state, isLoading: true }
    default:
      return state
  }
}
