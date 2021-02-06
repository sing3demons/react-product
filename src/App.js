import React from 'react'
import Layout from 'modules/ui/components/Layout'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'
import { ToastProvider } from 'react-toast-notifications'

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={3000}
        placement="top-center"
      >
        <Router>
          <Layout />
        </Router>
      </ToastProvider>
    </Provider>
  )
}
