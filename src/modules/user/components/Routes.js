import React from 'react'
import { Switch, useRouteMatch, Redirect } from 'react-router-dom'
import { LoginRoute } from 'utils/privateRoute'
import Login from './Login'
import Register from './Register'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <LoginRoute path={`${path}/login`} component={Login} />
      <LoginRoute path={`${path}/register`} component={Register} />
      <LoginRoute exact path={`${path}`}>
        <Redirect to="/users/login" />
      </LoginRoute>
    </Switch>
  )
}
