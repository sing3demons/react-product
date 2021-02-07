import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const LoginRoute = ({ component: Component, ...rest }) => {
  let isAuth = false
  const token = JSON.parse(localStorage.getItem('token'))

  if (token) {
    isAuth = true
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? <Redirect to="/users/login" /> : <Component {...props} />
      }
    />
  )
}
