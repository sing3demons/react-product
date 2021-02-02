import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Grid, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import queryString from 'query-string'

import CategoryList from './CategoryList'
import ProductItem from './ProductItem'

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
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const loadProducts = async () => {
    setIsLoading(true)
    const { data } = await axios.get(`/products`)

    setProducts(data.products.items)
    // console.log(data.products.items);
    setIsLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (isLoading) return <div>Loading...</div> //show Loading...
  return (
    <>
      <Typography variant="h4" component="h1" className={classes.title}>
        {category || 'All'} Products
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
    </>
  )
}
