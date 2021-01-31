import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  progress: {
    textAlign: 'center',
  },
}))

export default function HomePage() {
  const classes = useStyles()
  return (
    <>
      <h1 className={classes.title}>Home Page</h1>
    </>
  )
}
