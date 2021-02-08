import React from 'react'
import Layout from 'modules/ui/components/Layout'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from 'store/configureStore'
import { ToastProvider } from 'react-toast-notifications'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={3000}
          placement="bottom-center"
        >
          <ConnectedRouter history={history}>
            <Layout></Layout>
          </ConnectedRouter>
        </ToastProvider>
      </PersistGate>
    </Provider>
  )
}
