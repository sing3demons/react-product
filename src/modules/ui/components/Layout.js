import { CssBaseline, useMediaQuery } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Content from './Content'
import Header from './Header'
import * as actions from '../actions'

export default function Layout() {
  const dispatch = useDispatch()
  const { darkMode } = useSelector((state) => state.ui)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1abc9c',
      },
    },
  })

  useEffect(() => {
    const action = actions.setDarkMode(prefersDarkMode)
    dispatch(action)
  }, [prefersDarkMode, dispatch])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Content />
    </ThemeProvider>
  )
}
