import React, { useEffect, useState } from 'react'
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
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadProduct } from 'modules/products/actions'

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

export default function StockEdit() {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const [image, setImage] = useState({ preview: '', raw: '' })
  const [product] = useSelector((state) => state.products.items)

  useEffect(() => {
    dispatch(loadProduct(id))
  }, [dispatch, id])

  const { token } = JSON.parse(localStorage.getItem('token'))

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      })
    }
  }

  const schema = yup.object().shape({
    name: yup.string(),
    desc: yup.string(),
    price: yup.number().positive().integer(),
    categoryId: yup.number(),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const submit = async (product) => {
    try {
      const formData = new FormData()

      formData.append('name', product.name)

      formData.append('desc', product.desc)

      formData.append('price', product.price)

      formData.append('categoryId', product.categoryId)

      if (product.image.length === 1) {
        formData.append('image', product.image[0])
      }

      await axios.patch(`/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      addToast('success', { appearance: 'success' })
      history.push('/stock')
    } catch (error) {
      addToast(`error ${error.response.data.error}`, { appearance: 'error' })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <Card>
          <CardContent className={classes.form}>
            <Typography variant="h5" component="h2">
              Update Product
            </Typography>
            <TextField
              name="name"
              inputRef={register}
              variant="outlined"
              label="Name"
              placeholder="Enter your name"
              defaultValue={product && product.name}
              fullWidth
              helperText={errors.name?.message || ''}
              error={!!errors.name}
            />
            <TextField
              name="desc"
              inputRef={register}
              variant="outlined"
              label="Desc"
              placeholder="Enter your Description"
              defaultValue={product && product.desc}
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
              defaultValue={product && product.price}
              fullWidth
              helperText={errors.price?.message || ''}
              error={!!errors.price}
            />
            <TextField
              inputRef={register}
              variant="outlined"
              label="CategoryID"
              placeholder="Enter your ID"
              name="categoryId"
              defaultValue={product && product.categoryId}
              fullWidth
              helperText={errors.categoryId?.message || ''}
              error={!!errors.categoryId}
            />

            {image.preview ? (
              <img src={image.preview} alt="dummy" width="300" height="300" />
            ) : (
              product && (
                <img src={product.image} alt="dummy" width="300" height="300" />
              )
            )}

            <input
              type="file"
              name="image"
              onChange={handleChange}
              ref={register}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitBtn}
            >
              Add Product
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  )
}
