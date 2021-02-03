import React from 'react'
import Layout from 'modules/ui/components/Layout'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  )
}
