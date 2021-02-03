import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Grid, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import queryString from 'query-string'

import * as actions from '../actions'
import CategoryList from './CategoryList'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  progress: {
    textAlign: 'center',
  },
}))

export default function ProductList() {
  const classes = useStyles()
  const { search } = useLocation()
  const { category } = queryString.parse(search)
  const dispatch = useDispatch()
  const { isLoading, items: products } = useSelector((state) => state.products)

  useEffect(() => {
    const action = actions.loadProducts(search)
    dispatch(action)
  }, [dispatch, search])

  return (
    <div>
      <Typography variant="h4" component="h1" className={classes.title}>
        {category ? (
          <>
            {
              products.map((product) => {
                return `${product.category.name} Products`
              })[0]
            }
          </>
        ) : (
          <>All Products</>
        )}
      </Typography>
      <CategoryList></CategoryList>
      {isLoading ? (
        <div className={classes.progress}>
          <CircularProgress color="secondary"></CircularProgress>
        </div>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <ProductItem key={product.id} {...product}></ProductItem>
          ))}
        </Grid>
      )}
    </div>
  )
}
