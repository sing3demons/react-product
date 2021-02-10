import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  CardActions,
  Card,
  CardContent,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Container,
  CardMedia,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import logo_auth from 'assets/images/auth_header.jpg'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'
import { loginSuccess, updateProfile } from '../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 375,
    minWidth: 275,
  },
  media: {
    height: 200,
  },

  form: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  submitBtn: {
    flex: 1,
  },
}))

export default function Login() {
  const classes = useStyles()
  const history = useHistory()
  const { addToast } = useToasts()
  const dispatch = useDispatch()

  const [values, setValues] = useState({ password: '', showPassword: false })
  const handleChange = (prop) => (event) =>
    setValues({ ...values, [prop]: event.target.value })
  const handleClickShowPassword = () =>
    setValues({ ...values, showPassword: !values.showPassword })
  const handleMouseDownPassword = (event) => event.preventDefault()

  //Validation - yup
  const schema = yup.object().shape({
    email: yup.string().required().email('invalid email format'),
    password: yup.string().required().min(4),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const submit = async ({ email, password }) => {
    try {
      await dispatch(loginSuccess({ email, password }))
      await dispatch(updateProfile(JSON.parse(localStorage.getItem('profile'))))
      await addToast('Login success', { appearance: 'success' })
      await history.push('/')
    } catch (error) {
      addToast(error.response.data.error, {
        appearance: 'error',
      })
    }
  }

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={logo_auth}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.form}>
            <Typography variant="h5" component="h2" align="center">
              Login
            </Typography>

            <TextField
              inputRef={register}
              variant="outlined"
              label="Email"
              placeholder="Enter your Email"
              name="email"
              fullWidth
              helperText={errors.email?.message || ''}
              error={!!errors.email}
            />

            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                inputRef={register}
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                variant="outlined"
                label="Password"
                name="password"
                autoComplete="current-password"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                helperText={errors.password?.message || ''}
                error={!!errors.password}
              />
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitBtn}
            >
              Sign In
            </Button>
          </CardActions>
          <CardActions>
            <Button
              fullWidth
              size="small"
              color="primary"
              onClick={() => {
                history.push('/users/register')
              }}
            >
              Register
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  )
}
