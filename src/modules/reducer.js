import { combineReducers } from 'redux'

import cartReducer from 'modules/cart/reducer'
import productsReducer from 'modules/products/reducer'
import uiReducer from 'modules/ui/reducer'
import category from 'modules/category/reducer'

export default combineReducers({
  ui: uiReducer,
  cart: cartReducer,
  products: productsReducer,
  category,
})
