import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from 'modules/reducer'

//redux-persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const history = createBrowserHistory()

//redux-persist

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}
const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history)
)

function configureStore(initialState) {
  const middleware = [reduxThunk, routerMiddleware(history)]
  let store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore
