/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Badge,
  FormControlLabel,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
} from '@material-ui/core'
import {
  AccountCircle,
  ShoppingCart,
  MoreVert as MoreIcon,
} from '@material-ui/icons'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as productActions from '../actions'
import * as usersActions from 'modules/user/actions'

import logo from 'assets/images/logo.png'
import userLogo from 'assets/images/user_logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  logoLink: {
    marginRight: theme.spacing(2),
  },
  logoImage: {
    width: 30,
    height: 30,
  },
  spacer: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default function Header() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.users)

  const darkMode = useSelector((state) => state.ui.darkMode)
  const { total: cartCount, cart } = useSelector((state) => state.cart)

  useEffect(() => {
    const profileValue = JSON.parse(localStorage.getItem('profile'))
    dispatch(usersActions.updateProfile(profileValue))
  }, [dispatch])

  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const checkProfile = (
    <div>
      {profile ? (
        <div className={classes.root}>
          <MenuItem onClick={() => history.push('/users/profile')}>
            <b>name: {profile.name}</b>
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('profile')
              history.replace('/')
              dispatch(usersActions.updateProfile(null))
            }}
          >
            Logout
          </MenuItem>
        </div>
      ) : (
        <div className={classes.root}>
          <Link
            underline="none"
            color="inherit"
            component={RouterLink}
            to="/users"
          >
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          </Link>
          <Link
            underline="none"
            color="inherit"
            component={RouterLink}
            to="/users/register"
          >
            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          </Link>
        </div>
      )}
    </div>
  )

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {checkProfile}
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {checkProfile}
    </Menu>
  )

  const navigateToCart = () => history.push('/cart')
  const toggleDarkMode = () => dispatch(productActions.toggleDarkMode())

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            underline="none"
            className={classes.logoLink}
          >
            <img
              src={logo}
              alt="Babel Shopping"
              className={classes.logoImage}
            />
          </Link>

          <Link
            component={RouterLink}
            to="/products"
            color="inherit"
            underline="none"
            className={classes.logoLink}
          >
            Products
          </Link>

          <div className={classes.spacer}></div>
          <FormControlLabel
            control={
              <Switch
                color="secondary"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
            }
            label="Dark"
          ></FormControlLabel>
          <IconButton color="inherit" onClick={navigateToCart}>
            {Number.isInteger(cartCount) ? (
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCart />
              </Badge>
            ) : (
              <Badge badgeContent={+cart.map((c) => c.qty)} color="secondary">
                <ShoppingCart></ShoppingCart>
              </Badge>
            )}
          </IconButton>

          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {!profile ? (
                <AccountCircle />
              ) : (
                <img
                  style={{ width: 25, height: 25 }}
                  src={profile.avatar || userLogo}
                  alt="profile"
                />
              )}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
