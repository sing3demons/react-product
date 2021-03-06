import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import cartReducer from 'modules/cart/reducer'
import productsReducer from 'modules/products/reducer'
import uiReducer from 'modules/ui/reducer'
import category from 'modules/category/reducer'
import users from 'modules/user/reducer'
import stock from 'modules/stock/reducer'

// eslint-disable-next-line import/no-anonymous-default-export
export default (history) =>
  combineReducers({
    router: connectRouter(history),
    ui: uiReducer,
    cart: cartReducer,
    products: productsReducer,
    category,
    users,
    stock,
  })
