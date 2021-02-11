import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import { LoginRoute } from 'utils/loginRoute'
import Stock from './Stock'
import StockAddProduct from './StockAddProduct'
import StockEdit from './StockEdit'

export default function Routes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <LoginRoute path={`${path}/create`} component={StockAddProduct} />
      <LoginRoute path={`${path}/edit/:id`} component={StockEdit} />
      <LoginRoute exact path={`${path}`} component={Stock} />
    </Switch>
  )
}
