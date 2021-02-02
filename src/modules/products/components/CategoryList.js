import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import CategoryItem from './CategoryItem'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}))

export default function CategoryList() {
  const classes = useStyles()
  const [categories, setCategories] = useState([])

  const loadCategory = async () => {
    const { data } = await axios.get(`/categories`)
    setCategories(data.category)
  }

  useEffect(() => {
    loadCategory()
  }, [])

  return (
    <Grid container justify="center" spacing={2} className={classes.root}>
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category}></CategoryItem>
      ))}
    </Grid>
  )
}
