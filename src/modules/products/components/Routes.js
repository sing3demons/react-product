import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ProductAdd from './ProductAdd'
import ProductDetail from './ProductDetail'
import ProductList from './ProductList'
import { LoginRoute } from 'utils/loginRoute'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/create`} component={ProductAdd} />
      <Route path={`${path}/:id`} component={ProductDetail} />
      <Route exact path={`${path}`} component={ProductList} />
    </Switch>
  )
}
