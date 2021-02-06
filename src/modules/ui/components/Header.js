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
  Select,
  Switch,
  Toolbar,
} from '@material-ui/core'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import logo from 'assets/images/logo.png'
import {
  AccountCircle,
  ShoppingCart,
  MoreVert as MoreIcon,
} from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import * as productActions from '../actions'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer,
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
  const [profile, setProfile] = useState(null)

  const darkMode = useSelector((state) => state.ui.darkMode)
  const cartCount = useSelector((state) => state.cart.total)
  const cart = useSelector((state) => state.cart.cart)

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
      {profile ? (
        <>
          <Link underline="none" color="inherit" component={RouterLink}>
            <MenuItem onClick={handleMenuClose}>{profile.name}</MenuItem>
          </Link>
          <Link underline="none" color="inherit" component={RouterLink}>
            <MenuItem
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('profile')
                history.go(0)
              }}
            >
              Logout
            </MenuItem>
          </Link>
        </>
      ) : (
        <>
          <Link
            underline="none"
            color="inherit"
            component={RouterLink}
            to="/user"
          >
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          </Link>
          <Link
            underline="none"
            color="inherit"
            component={RouterLink}
            to="/user/register"
          >
            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          </Link>
        </>
      )}
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
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
        {/* <Link
          underline="none"
          color="inherit"
          component={RouterLink}
          to="/user"
        >
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
        </Link>
        <Link
          underline="none"
          color="inherit"
          component={RouterLink}
          to="/user/register"
        >
          <MenuItem onClick={handleMenuClose}>Register</MenuItem>
        </Link> */}
      </MenuItem>
    </Menu>
  )

  const navigateToCart = () => history.push('/cart')
  const toggleDarkMode = () => dispatch(productActions.toggleDarkMode())

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
              <AccountCircle />
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
