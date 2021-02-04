import {
  LOAD_CATEGORIES_REQUEST,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
} from './actions'

const initialState = {
  categories: [],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES_REQUEST:
      return { ...state, categories: [] }
    case LOAD_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload.categories }
    case LOAD_CATEGORIES_FAILURE:
      return { ...state }
    default:
      return state
  }
}
