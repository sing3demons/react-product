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
} from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import logo_auth from 'assets/images/authen_header.jpg'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'

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

export default function Register() {
  const classes = useStyles()
  const history = useHistory()
  const { addToast } = useToasts()

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  })
  const handleChange = (prop) => (event) =>
    setValues({ ...values, [prop]: event.target.value })

  const handleClickShowPassword = () =>
    setValues({ ...values, showPassword: !values.showPassword })

  const handleMouseDownPassword = (event) => event.preventDefault()

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(4, '4 ตัวขึ้นไป'),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const submit = async ({ email, password, name }) => {
    try {
      const { data } = await axios.post('/auth/register', {
        email,
        password,
        name,
      })
      addToast(data.message, { appearance: 'success' })
      history.replace('/users')
    } catch (error) {
      addToast(error.response.data.error, { appearance: 'error' })
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
              Register
            </Typography>
            <TextField
              inputRef={register}
              variant="outlined"
              label="Name"
              placeholder="Enter your fullname"
              name="name"
              fullWidth
              helperText={errors.name?.message || ''}
              error={!!errors.name}
            />

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
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitBtn}
            >
              Register
            </Button>
          </CardActions>
          <CardActions>
            <Button
              fullWidth
              size="small"
              color="primary"
              onClick={() => {
                history.push('/user')
              }}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  )
}
