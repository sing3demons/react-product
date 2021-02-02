import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Grid, Chip } from '@material-ui/core'

export default function CategoryItem({ name }) {
  const history = useHistory()
  const { path } = useRouteMatch()

  const filterProductsByCategory = () => {
    history.push(`${path}?category=${name}`)
  }

  return (
    <Grid item onClick={filterProductsByCategory}>
      <Chip icon={name} label={name} clickable color="primary"></Chip>
    </Grid>
  )
}
