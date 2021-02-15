import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Order from './Order'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}))

export default function Cart() {
  const classes = useStyles()
  const { total } = useSelector((state) => state.cart)

  if (total === 0)
    return (
      <Typography variant="h6" component="h1" className={classes.title}>
        No order found
      </Typography>
    )
  return (
    <>
      <Typography variant="h4" component="h1" className={classes.title}>
        Order Summary
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Order />
        </Grid>
      </Grid>
    </>
  )
}
