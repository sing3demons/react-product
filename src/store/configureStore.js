import { createStore, applyMiddleware } from 'redux'
import rootReducer from 'modules/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(initialState) {
  const middleware = []

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  return store
}
