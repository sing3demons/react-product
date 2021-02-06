import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const token = JSON.parse(localStorage.getItem('token'))
export const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (token ? <Redirect to="/" /> : <Component {...props} />)}
  />
)

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      token ? <Component {...props} /> : <Redirect to="/users/login" />
    }
  />
)
