import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PrivateRoute } from 'utils/privateRoute'
import ProductAdd from './ProductAdd'
import ProductDetail from './ProductDetail'
import ProductList from './ProductList'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <PrivateRoute path={`${path}/create`} component={ProductAdd} />
      <Route path={`${path}/:id`} component={ProductDetail} />
      <Route exact path={`${path}`} component={ProductList} />
    </Switch>
  )
}
