import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import Order from './Order'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}))

export default function Cart() {
  const classes = useStyles()
  return (
    <>
      <Typography variant="h4" component="h1" className={classes.title}>
        Oder Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Order />
        </Grid>
      </Grid>
    </>
  )
}
