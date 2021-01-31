import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProductAdd from './ProductAdd'
import ProductList from './ProductList'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/products">
        <ProductList />
      </Route>
      <Route path="/products/edit">
        <ProductAdd />
      </Route>
    </Switch>
  )
}
