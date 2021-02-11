import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import userLogo from 'assets/images/user_logo.png'
import { updateProfile } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { history } from 'store/configureStore'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  progress: {
    textAlign: 'center',
  },
  logoImage: {
    width: 130,
    height: 130,
  },
}))

export default function Profile() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(updateProfile(JSON.parse(localStorage.getItem('profile'))))
  }, [dispatch])

  return (
    <div className={classes.title}>
      <h1 className={classes.progress}>Welcome</h1>
      <h1 className={classes.progress}>
        <img
          className={classes.logoImage}
          src={(profile && profile.avatar) || userLogo}
          alt="Profile"
        />
      </h1>
      <h2>{profile && `Name: ${profile.name}`}</h2>
      <h2>{profile && `Email: ${profile.email}`}</h2>
      <h2>{profile && `Role: ${profile.role}`}</h2>
      <Button
        size="small"
        color="primary"
        onClick={() => history.push('/stock')}
      >
        Menu Admin
      </Button>
    </div>
  )
}
