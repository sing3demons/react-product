import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
