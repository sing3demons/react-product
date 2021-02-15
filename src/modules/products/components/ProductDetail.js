import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles,useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Grid, Paper, Typography, ButtonGroup, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import * as productAction from '../actions'
import * as cartActions from 'modules/cart/actions'
import currencyFormat from 'utils/currencyFormat'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  content: {
    height: '100%',
  },
  amountContainer: {
    marginBottom: theme.spacing(2),
  },
  amount: {
    padding: theme.spacing(0, 2),
  },
}))

export default function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product] = useSelector((state) => state.products.items)
  const { cart } = useSelector((state) => state.cart)

  const classes = useStyles()
  const history = useHistory()
  const theme = useTheme()
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    dispatch(productAction.loadProduct(id))
  }, [dispatch, id])

  const addToCart = () => {
    const products = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1,
      total: product.price,
    }

    dispatch(cartActions.addToCart(products, cart))
  }

  const buyNow = () => {
    addToCart()
    history.push('/cart')
  }

  if (!product) return null

  return (
    <Paper className={classes.root}>
      <Grid
        container
        spacing={2}
        justify={isMediumUp ? 'flex-start' : 'center'}
      >
        <Grid item>
          <img src={product.image} alt={product.name} />
        </Grid>
        <Grid item>
          <Grid
            container
            className={classes.content}
            direction="column"
            justify="space-between"
          >
            <Grid item>
              <Typography variant="h4" component="h1">
                {product.name}
              </Typography>
              <p>{product.desc}</p>
              <p>{currencyFormat(product.price)}</p>
            </Grid>
            <Grid item>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="primary button group"
              >
                <Button onClick={buyNow}>Buy Now</Button>
                <Button onClick={addToCart}>Add to Cart</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
