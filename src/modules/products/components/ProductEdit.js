import React from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  CardActions,
  Card,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core'
import * as yup from 'yup'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  form: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  submitBtn: {
    flex: 1,
  },
}))

export default function ProductEdit() {
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      desc: yup.string().required(),
      price: yup.number().positive().integer().required(),
      CategoryID: yup.number().required(),
    }),
  })

  const submit = async (product) => {
    try {
      const formData = new FormData()
      formData.append('name', product.name)
      formData.append('desc', product.desc)
      formData.append('price', product.price)
      formData.append('categoryId', product.categoryId)
      formData.append('image', product.image[0])

      const { data } = await axios.post('/products', formData)
      console.log(data)
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} autoComplete="off">
      <Card>
        <CardContent className={classes.form}>
          <Typography variant="h5" component="h2">
            Edit Product
          </Typography>
          <TextField
            name="name"
            inputRef={register}
            variant="outlined"
            label="Name"
            placeholder="Enter your name"
            fullWidth
            helperText={errors.name?.message || ''}
            error={!!errors.name}
          />

          <TextField
            inputRef={register}
            variant="outlined"
            label="Desc"
            placeholder="Enter your Description"
            name="desc"
            fullWidth
            helperText={errors.desc?.message || ''}
            error={!!errors.desc}
          />

          <TextField
            inputRef={register}
            variant="outlined"
            label="Price"
            placeholder="Enter your price"
            name="price"
            fullWidth
            helperText={errors.price?.message || ''}
            error={!!errors.price}
          />
          {/* <input type="number" name="price" ref={register} />
          <input type="number" name="categoryId" ref={register} /> */}
          <TextField
            inputRef={register}
            variant="outlined"
            label="CategoryID"
            placeholder="Enter your ID"
            name="categoryId"
            fullWidth
            helperText={errors.categoryId?.message || ''}
            error={!!errors.categoryId}
          />
          <input ref={register} type="file" name="image" />
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitBtn}
          >
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
