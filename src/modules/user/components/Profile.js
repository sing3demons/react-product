import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import userLogo from 'assets/images/user_logo.png'
import { updateProfile } from '../actions'
import { useDispatch, useSelector } from 'react-redux'

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
    <>
      <h1 className={classes.progress}>Welcome</h1>
      <h1 className={classes.progress}>
        <img
          className={classes.logoImage}
          src={(profile && profile.avatar) || userLogo}
          alt="Profile"
        />
      </h1>
      <h2 className={classes.title}>{profile && `Name: ${profile.name}`}</h2>
      <h2 className={classes.title}>{profile && `Email: ${profile.email}`}</h2>
      <h2 className={classes.title}>{profile && `Role: ${profile.role}`}</h2>
    </>
  )
}
