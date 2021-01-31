import { CssBaseline } from '@material-ui/core'
import React from 'react'
import Content from './Content'
import Header from './Header'

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Content/>
    </>
  )
}
