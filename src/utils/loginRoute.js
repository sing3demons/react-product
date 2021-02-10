import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const LoginRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector((state) => state.users)
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? <Redirect to="/users/login" /> : <Component {...props} />
      }
    />
  )
}
