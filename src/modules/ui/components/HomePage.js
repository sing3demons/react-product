import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import userLogo from 'assets/images/user_logo.png'
import { updateProfile } from 'modules/user/actions'
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

export default function HomePage() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.users)

  useEffect(() => {
    const profileValue = JSON.parse(localStorage.getItem('profile'))
    dispatch(updateProfile(profileValue))
  }, [dispatch])

  return (
    <>
      <h1 className={classes.title}>ยินดีต้อนรับ</h1>
      <h2 className={classes.title}>{profile && profile.name}</h2>
      <h3 className={classes.progress}>
        <img
          className={classes.logoImage}
          src={(profile && profile.avatar) || userLogo}
          alt="Profile"
        />
      </h3>
    </>
  )
}
