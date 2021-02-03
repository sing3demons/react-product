import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import ProductRoute from 'modules/products/components/Routes'
import CartRoutes from 'modules/cart/components/Routes'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/products">
        <ProductRoute />
      </Route>
      <Route path="/cart">
        <CartRoutes></CartRoutes>
      </Route>
      <Route>
        <div>page not found</div>
      </Route>
    </Switch>
  )
}
