import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export function PrivateRoute({ children, ...rest }) {
  let isAuth = false
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    isAuth = true
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/users/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
