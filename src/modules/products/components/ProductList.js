import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Grid, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import queryString from 'query-string'

import * as actions from '../actions'
import CategoryList from '../../category/components/CategoryList'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
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
  const { isLoading, items: products, paging } = useSelector(
    (state) => state.products
  )
  // console.log(paging)

  useEffect(() => {
    const action = actions.loadProducts(search)
    dispatch(action)
  }, [dispatch, search])

  return (
    <div className={classes.root}>
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
        <div>
          <Grid container spacing={2}>
            {products.map((product) => (
              <ProductItem key={product.id} {...product}></ProductItem>
            ))}
          </Grid>

          <Pagination
            className={classes.root}
            count={paging.totalPage}
            page={paging.page}
            variant="outlined"
            color="primary"
          />
        </div>
      )}
    </div>
  )
}
