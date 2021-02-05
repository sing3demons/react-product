import React from 'react'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/login`} component={Login} />
      <Route path={`${path}/register`} component={Register} />
      <Route exact path={`${path}`}>
        <Redirect to="/user/login" />
      </Route>
    </Switch>
  )
}
