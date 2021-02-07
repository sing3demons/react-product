import React from 'react'
import Layout from 'modules/ui/components/Layout'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from 'store/configureStore'
import { ToastProvider } from 'react-toast-notifications'

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={3000}
        placement="bottom-center"
      >
        <ConnectedRouter history={history}>
          <Layout></Layout>
        </ConnectedRouter>
      </ToastProvider>
    </Provider>
  )
}
