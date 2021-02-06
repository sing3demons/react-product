import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'

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
    </>
  )
}
