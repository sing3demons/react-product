import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import userLogo from 'assets/images/user_logo.png'

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
  const [profile, setProfile] = useState(null)

  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem('profile'))
    if (profileValue) {
      setProfile(profileValue)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])
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
