import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import ProductRoute from 'modules/products/components/Routes'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/products">
        <ProductRoute />
      </Route>
    </Switch>
  )
}
