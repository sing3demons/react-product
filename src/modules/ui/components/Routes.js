import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import ProductRoute from 'modules/products/components/Routes'
import Cart from 'modules/cart/components/Cart'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Cart />
      </Route>
      <Route path="/products">
        <ProductRoute />
      </Route>
      <Route>
        <div>page not found</div>
      </Route>
    </Switch>
  )
}
