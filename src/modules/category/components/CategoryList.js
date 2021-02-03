import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import CategoryItem from './CategoryItem'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'modules/category/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}))

export default function CategoryList() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category.categories)

  useEffect(() => {
    const action = actions.loadCategory()
    dispatch(action)
  }, [dispatch])

  return (
    <Grid container justify="center" spacing={2} className={classes.root}>
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category}></CategoryItem>
      ))}
    </Grid>
  )
}
