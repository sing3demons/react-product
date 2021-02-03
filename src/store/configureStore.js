import { createStore, applyMiddleware } from 'redux'
import rootReducer from 'modules/reducer'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(initialState) {
  const middleware = [reduxThunk]

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  return store
}
