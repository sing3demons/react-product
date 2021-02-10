import React from 'react'
import { Switch, useRouteMatch, Redirect, Route } from 'react-router-dom'
import { PrivateRoute } from 'utils/privateRoute'
import { LoginRoute } from 'utils/loginRoute'
import Login from './Login'
import Profile from './Profile'
import Register from './Register'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <PrivateRoute path={`${path}/login`} component={Login} />
      <PrivateRoute path={`${path}/register`} component={Register} />
      <LoginRoute path={`${path}/profile`} component={Profile} />
      <Route path={`${path}`}>
        <Redirect to="/users/login" />
      </Route>
    </Switch>
  )
}
