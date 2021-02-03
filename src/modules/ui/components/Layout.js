import { CssBaseline, useMediaQuery } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import Content from './Content'
import Header from './Header'

export default function Layout() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = createMuiTheme({
    palette: {
      type: !prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1abc9c',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Content />
    </ThemeProvider>
  )
}
