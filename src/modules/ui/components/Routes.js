import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import ProductRoute from 'modules/products/components/Routes'
import CartRoutes from 'modules/cart/components/Routes'
import UserRoutes from 'modules/user/components/Routes'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/user" component={UserRoutes} />
      <Route path="/products" component={ProductRoute} />
      <Route path="/cart" component={CartRoutes} />
      <Route>
        <div>page not found</div>
      </Route>
    </Switch>
  )
}
