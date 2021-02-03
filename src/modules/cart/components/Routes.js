import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Cart from './Cart'

export default function Routes() {
    const { path } = useRouteMatch()
    return (
      <Switch>
        <Route path={`${path}/create`} component={Cart} />
        <Route path={`${path}/:id`} component={ProductDetail} />
        <Route exact path={`${path}`} component={ProductList} />
      </Switch>
    )
}
